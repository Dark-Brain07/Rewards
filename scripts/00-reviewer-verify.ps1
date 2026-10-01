$ErrorActionPreference = 'Stop'
Write-Output 'Rewards reviewer verification'
Write-Output 'Target network: GenLayer Studionet (61999)'
if (-not $env:VITE_Rewards_CONTRACT_ADDRESS) { Write-Output 'STATUS: NOT DEPLOYED (VITE_Rewards_CONTRACT_ADDRESS is unset)' } else { Write-Output "Contract: $env:VITE_Rewards_CONTRACT_ADDRESS" }
genvm-lint check contracts/Rewards.py --json
genvm-lint schema contracts/Rewards.py --output artifacts/Rewards.schema.json
Write-Output 'PASS: local contract gates'
