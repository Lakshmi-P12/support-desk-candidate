import express from 'express';
import cors from 'cors';
import { db } from './db.js';
export const app = express();
app.use(cors({ origin: 'http://127.0.0.1:5173' }));
app.use(express.json());
const allowedPriority = ['low','medium','high'];
const allowedStatus = ['open','in_progress','resolved'];
const columns = 'id,title,description,priority,status,assignee,created_at';
app.get('/api/health', (_req,res)=>res.json({ok:true}));
app.get('/api/tickets', (req,res)=>{
 const page = Math.max(1,parseInt(req.query.page,10)||1);
 const limit = Math.min(100,Math.max(1,parseInt(req.query.limit,10)||10));
 const clauses=[]; const args=[];
 if(req.query.status && allowedStatus.includes(req.query.status)){clauses.push('status = ?');args.push(req.query.status)}
 if(req.query.priority && allowedPriority.includes(req.query.priority)){clauses.push('priority = ?');args.push(req.query.priority)}
 if(req.query.search){clauses.push('(title LIKE ? OR description LIKE ?)');args.push(`%${req.query.search}%`,`%${req.query.search}%`)}
 const where=clauses.length?' WHERE '+clauses.join(' AND '):'';
 const total=db.prepare('SELECT COUNT(*) AS n FROM tickets'+where).get(...args).n;
 const tickets=db.prepare(`SELECT ${columns} FROM tickets${where} ORDER BY id DESC LIMIT ? OFFSET ?`).all(...args,limit,(page-1)*limit);
 res.json({tickets,total,page,limit,pages:Math.max(1,Math.ceil(total/limit))});
});
app.get('/api/tickets/stats',(_req,res)=>{
 const rows=db.prepare('SELECT status,COUNT(*) AS count FROM tickets GROUP BY status').all();
 res.json({total:db.prepare('SELECT COUNT(*) AS n FROM tickets').get().n,byStatus:Object.fromEntries(rows.map(x=>[x.status,x.count]))});
});
// Task 3: Candidate implements GET /api/tickets/export here.
app.post('/api/tickets',(req,res)=>{
 const {title,description='',priority='medium',assignee=''}=req.body||{};
 if(typeof title!=='string'||!title.trim()||!allowedPriority.includes(priority)||typeof description!=='string'||typeof assignee!=='string')return res.status(400).json({error:'Invalid ticket fields'});
 const info=db.prepare('INSERT INTO tickets(title,description,priority,status,assignee) VALUES(?,?,?,?,?)').run(title.trim(),description,priority,'open',assignee);
 res.status(201).json(db.prepare(`SELECT ${columns} FROM tickets WHERE id=?`).get(info.lastInsertRowid));
});
app.patch('/api/tickets/:id',(req,res)=>{
 const existing=db.prepare('SELECT * FROM tickets WHERE id=?').get(req.params.id);
 if(!existing)return res.status(404).json({error:'Ticket not found'});
 const {title=existing.title,description=existing.description,priority=existing.priority,status=existing.status,assignee=existing.assignee}=req.body||{};
 if(typeof title!=='string'||!title.trim()||typeof description!=='string'||typeof assignee!=='string'||!allowedPriority.includes(priority)||!allowedStatus.includes(status))return res.status(400).json({error:'Invalid ticket fields'});
 db.prepare('UPDATE tickets SET title=?,description=?,priority=?,status=?,assignee=? WHERE id=?').run(title.trim(),description,priority,status,assignee,req.params.id);
 res.json(db.prepare(`SELECT ${columns} FROM tickets WHERE id=?`).get(req.params.id));
});
app.delete('/api/tickets/:id',(req,res)=>{
 const result=db.prepare('DELETE FROM tickets WHERE id=?').run(req.params.id);
 if(!result.changes)return res.status(404).json({error:'Ticket not found'});
 res.status(204).end();
});
app.use((err,_req,res,_next)=>{console.error(err);res.status(500).json({error:'Internal server error'})});
