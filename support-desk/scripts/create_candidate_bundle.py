from pathlib import Path
import zipfile
root=Path(__file__).resolve().parents[1]
out=root.parent/'support-desk-candidate.zip'
with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as z:
 for file in root.rglob('*'):
  if not file.is_file(): continue
  rel=file.relative_to(root)
  if any(part in {'.git','node_modules','interviewer-private','dist','data'} for part in rel.parts): continue
  if file.suffix in {'.db','.pyc'} or file.name.startswith('.env') and file.name!='.env.example': continue
  z.write(file,Path('support-desk')/rel)
print(out)
