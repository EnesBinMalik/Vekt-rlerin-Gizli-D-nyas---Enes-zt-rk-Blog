import JSZip from 'jszip';
import { CODE_FILES } from '../data/codeFiles';
import { ALL_CASES } from '../data/casesData';

export async function generateCodeZip(): Promise<Blob> {
  const zip = new JSZip();
  const root = zip.folder('orchestration_agent');

  if (!root) {
    throw new Error('Failed to create orchestration_agent zip folder');
  }

  // Add source files
  for (const file of CODE_FILES) {
    if (file.path.startsWith('orchestration_agent/evaluation/')) {
      const evalFolder = root.folder('evaluation');
      if (evalFolder) {
        evalFolder.file(file.name, file.content);
      }
    } else {
      root.file(file.name, file.content);
    }
  }

  // Generate output.csv with all 518 cases
  let csvContent = 'case_id,deletion_status,steps_json\n';
  for (const c of ALL_CASES) {
    const escapedJson = JSON.stringify(c.steps_json).replace(/"/g, '""');
    csvContent += `${c.case_id},${c.deletion_status},"${escapedJson}"\n`;
  }
  root.file('output.csv', csvContent);

  return await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadOutputCsv() {
  let csvContent = 'case_id,deletion_status,steps_json\n';
  for (const c of ALL_CASES) {
    const escapedJson = JSON.stringify(c.steps_json).replace(/"/g, '""');
    csvContent += `${c.case_id},${c.deletion_status},"${escapedJson}"\n`;
  }
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, 'output.csv');
}
