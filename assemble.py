import json
import os

template_path = r'C:\Users\Sathana Jayaraman\.gemini\antigravity\scratch\template.html'
json_path = r'C:\Users\Sathana Jayaraman\.gemini\antigravity\scratch\foodpulse-dashboard\src\data\foodpulseData.json'
artifact_path = r'C:\Users\Sathana Jayaraman\.gemini\antigravity\brain\952f3d2a-5d4b-43b4-899b-71183805b3bc\foodpulse_dashboard.html'
preview_path = r'C:\Users\Sathana Jayaraman\.gemini\antigravity\scratch\foodpulse-dashboard\dashboard_preview.html'

with open(template_path, 'r', encoding='utf-8') as f:
    template = f.read()

with open(json_path, 'r', encoding='utf-8') as f:
    data_str = f.read()

output_html = template.replace('__DATA_JSON_PLACEHOLDER__', data_str)

with open(artifact_path, 'w', encoding='utf-8') as f:
    f.write(output_html)

with open(preview_path, 'w', encoding='utf-8') as f:
    f.write(output_html)

print('Assembled successfully! Output size:', os.path.getsize(artifact_path), 'bytes')
