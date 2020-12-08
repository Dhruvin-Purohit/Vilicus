import './Client'
import Client from './Client'

import { token, ownerIDs } from './Config'

const client: Client = new Client({ token, ownerIDs});
client.start()