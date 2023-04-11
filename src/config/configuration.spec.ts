import { configuration } from '@config/configuration';

describe('configuration', () => {
  it('should return the configuration object', () => {
    const config = configuration();
    expect(config).toBeDefined();
    expect(config.NODE_ENV).toBeDefined();
    expect(config.app).toBeDefined();
    expect(config.db).toBeDefined();
  });

  it('should return default app port if APP_PORT environment variable is not set', () => {
    delete process.env.APP_PORT;
    const config = configuration();
    expect(config.app.port).toEqual(3000);
  });

  it('should parse APP_PORT environment variable as integer', () => {
    process.env.APP_PORT = '8080';
    const config = configuration();
    expect(config.app.port).toEqual(8080);
  });

  it('should return the correct values for app properties', () => {
    process.env.APP_NAME = 'My App';
    process.env.APP_DESCRIPTION = 'My App Description';
    process.env.APP_VERSION = '1.0.0';
    process.env.APP_IS_PRODUCTION = 'true';
    const config = configuration();
    expect(config.app.name).toEqual('My App');
    expect(config.app.description).toEqual('My App Description');
    expect(config.app.version).toEqual('1.0.0');
    expect(config.app.isProduction).toEqual(true);
  });

  it('should return the correct values for postgres properties', () => {
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '5432';
    process.env.DB_NAME = 'mydb';
    process.env.DB_TYPE = 'postgres';
    process.env.DB_USER = 'postgres';
    process.env.DB_PASSWORD = 'password';
    process.env.DB_SYNCHRONIZE_ENTITIES = 'false';
    const config = configuration();
    expect(config.db.host).toEqual('localhost');
    expect(config.db.port).toEqual(5432);
    expect(config.db.name).toEqual('mydb');
    expect(config.db.user).toEqual('postgres');
    expect(config.db.password).toEqual('password');
    expect(config.db.type).toEqual('postgres');
    expect(config.db.synchronize).toEqual(true);
  });
});
