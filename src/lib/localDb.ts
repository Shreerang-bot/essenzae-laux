import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data.json');

export interface Product {
    id: string;
    name: string;
    price: number | string;
    description: string;
    amazonUrl: string;
    images: string[];
    created_at?: string;
}

export interface ProductClick {
    event_type: 'page_view' | 'amazon_click';
    sku_id: string | null;
    created_at: string;
}

export interface DbSchema {
    products: Product[];
    product_clicks: ProductClick[];
}

const defaultData: DbSchema = {
    products: [],
    product_clicks: []
};

// Initialize DB safely
export async function getDb(): Promise<DbSchema> {
    try {
        const fileData = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(fileData);
    } catch (e: any) {
        if (e.code === 'ENOENT') {
            await fs.writeFile(DB_PATH, JSON.stringify(defaultData, null, 2), 'utf-8');
            return defaultData;
        }
        throw e;
    }
}

export async function saveDb(data: DbSchema): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
