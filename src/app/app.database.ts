import { DatabaseConfig } from './services/database.service';

export const appDatabaseConfig: DatabaseConfig = {
		url: 'http://localhost:8080'
}

export type AppDatabaseControls = 'user'|'order'|'product'|'settings'
