import psycopg2

try:
    conn = psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password="Neela@#1703",
        host="db.iafzmxcgasdvyhwtryvj.supabase.co",
        port="5432",
        sslmode="require"
    )
    print("✅ Connected successfully!")
    conn.close()

except Exception as e:
    print("❌ Error:", e)