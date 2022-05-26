
## Testing

cd ..

swipl test/test_scasp.pl -- --assume --nmr --dcc --cov=./dir test/min_programs/

swipl test/test_scasp_extended.pl -- --cov=./dir test/min_programs/

swipl test/test_scasp_extended.pl -- --assume --dcc --cov=./dir test/min_programs/

swipl test/test_scasp_extended.pl -- --assume --nmr --dcc --cov=./dir test/min_programs/

swipl test/test_scasp_extended.pl -- --assume --nmr --dcc  --olon --cov=./dir test/min_programs/

swipl test/test_scasp_extended.pl -- --assume --olon --cov=./dir test/min_programs/

swipl test/test_scasp_extended.pl -- --assume --trace_dcc --nmr --dcc  --olon --cov=./dir test/min_programs/

## Execution

cd ..

swipl test_scasp.pl [option ...] [dir ...] [file ...]
