import { createClient, createAccount, generatePrivateKey } from 'genlayer-js'
import { studionet } from 'genlayer-js/chains'
import { readFile } from 'node:fs/promises'

async function main() {
    const pk = generatePrivateKey()
    const client = createClient({chain: studionet, account: createAccount(pk)})
    const code = await readFile('../contracts/rewards.py', 'utf8')
    try {
        const hash = await client.deployContract({code, args: []})
        console.log('Deploy hash:', hash)
        const receipt = await client.waitForTransactionReceipt({
            hash,
            status: 'FINALIZED',
            retries: 100,
            interval: 5000
        });
        console.log('Deploy Receipt:', JSON.stringify({
            hash: receipt.hash,
            address: receipt.data?.contract_address,
            status: receipt.status_name
        }, null, 2))
    } catch (err) {
        console.error("Error deploying:", err)
    }
}
main()
