# Database Dump Instructions

This directory contains resources for initializing the database with sample data.

## Using the provided MongoDB archive dump (recommended)

The easiest way to get started is to use the provided archive dump:

```bash
# Restore the database from the archive dump (with --drop to ensure clean state)
mongorestore --drop --archive=./company-api.archive
```

This single file contains all collections, documents, and indexes for the sample data.

## Using the JavaScript initialization script

If you prefer to initialize the database programmatically:

```bash
mongosh mongodb://localhost:27017/company-api init-db.js
```

This will:

1. Clear any existing data
2. Create sample users, contacts, and companies
3. Set up appropriate indexes

## Creating your own archive dump

If you've made changes to the database and want to create a new dump:

```bash
# Create a single-file archive dump
mongodump --uri="mongodb://localhost:27017/company-api" --archive=./company-api.archive
```

## Sample Data Structure

The database dump contains the following sample data:

1. One admin user:

   - Username: `admin`
   - Password: `admin123`

2. Three contacts:

   - Сергей Григорьев - Contact for a funeral company
   - Иван Иванов - Contact for a construction company
   - Анна Смирнова - Contact for a sole proprietor

3. Three companies with different types and statuses:
   - ООО Фирма «Перспективные захоронения» - Active agent and contractor
   - ЗАО «Строительная компания» - Active contractor
   - ИП Сидоров А.В. - Inactive agent
