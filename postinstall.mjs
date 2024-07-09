import { runPostInstallSetup } from 'componentize-postinstall'

if (process.env.INIT_CWD === process.cwd())
    process.exit()

runPostInstallSetup()