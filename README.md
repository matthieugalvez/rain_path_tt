# Workflow Builder

## Overview

This is a visual workflow builder designed to create and simulate patient communication flows.

The project includes:

* a React + ReactFlow frontend editor,
* a NestJS backend API,
* Prisma + SQLite persistence,
* workflow validation,
* visual workflow simulation.

---

# Tech Stack

## Frontend

* React
* TypeScript
* ReactFlow (`@xyflow/react`)
* Zustand

## Backend

* NestJS
* Prisma
* SQLite

---

# Installation

## Requirements

* Node.js >= 20
* npm
* make

---

# Project Setup

Clone the repository:

```bash
git clone git@github.com:matthieugalvez/rain_path_tt.git
cd rain_path
```

Launch the project:

```bash
make
```

Install dependencies, then start frontend and backend servers.

---

# Available Makefile Commands

## Start the full project

```bash
make dev
```

Starts:

* frontend Vite server,
* backend NestJS server.

---

## Start frontend only

```bash
make front
```

Frontend available on:

```txt
http://localhost:5173
```

---

## Start backend only

```bash
make back
```

Backend available on:

```txt
http://localhost:3000
```

---

## Sync Prisma Schema

```bash
make prisma
```

---

## Open Prisma Studio

```bash
make studio
```

---

## Clean node_modules

```bash
make clean
```

---

## Default

```bash
make all
```

Runs the complete setup sequence:
- install dependencies,
- generate Prisma client and synchronize the database schema,
- start frontend and backend servers.

This is the default rule executed when running:
```bash
make
```

The command blocks while frontend and backend development servers are running.

## Rebuild

```bash
make re
```

This command will run the `clean` rule and then `all`

# Frontend Usage

## Workflow Editor

The editor allows users to:

* create workflow nodes,
* connect nodes visually,
* validate workflow structure,
* simulate patient progression.

---

## Available Node Types

### Start Node

* unique,
* automatically created,
* cannot be deleted.

### End Node

* unique,
* automatically created,
* cannot be deleted.

### Message Nodes

Represents communication actions:

* email,
* SMS,
* WhatsApp,
* etc.

### Condition Nodes

Allows branching logic with:

* YES branch,
* NO branch.

Only one outgoing connection is allowed per branch.

### Delay Node

Represents a time delay before the next action.

---

# Workflow Validation Rules

The editor validates:

* all handles must be connected,
* all branches must end with an End node,
* invalid nodes are highlighted in red,
* condition nodes must contain valid branches.

Validation errors are contextual and only displayed for the selected node.

---

# Workflow Simulation

The application includes a simulated patient progression mode.

Simulation features:

* completed nodes are greyed out,
* current node is highlighted,
* next active edge is highlighted,
* conditional branching is supported.

The simulation is entirely frontend-based and does not execute real workflows.

A pre-generated database containing a sample workflow is included to demonstrate the simulation mode.

---

# Backend API

## Base URL

```txt
http://localhost:3000
```

---

## Hello Endpoint

#### GET `/hello`

Returns a simple response used to test backend availability.

## Workflow Endpoints

### Save Workflow

#### POST `/workflows`

Creates or updates a workflow.

If a workflow with the same name already exists, it is overwritten.

##### Request Body

```json
{
  "name": "Patient Journey",
  "nodes": [],
  "edges": []
}
```

---

### Get All Workflows

#### GET `/workflows`

Returns all saved workflows.

---

### Get Workflow By id

#### GET `/workflows/:id`

Returns a specific workflow.

Example:

```txt
GET /workflows/cmppxbbcf0002nliy39ul0af5
```

---

### Delete Workflow

#### DELETE `/workflows/:id`

Deletes a workflow by id.

---

# Database

The backend uses:

* Prisma ORM,
* SQLite database.

Database file:

```txt
backend/dev.db
```

---

# Prisma Configuration

Generate Prisma client manually if needed:

```bash
cd backend
npx prisma generate
```

---

* Workflow persistence is handled entirely through Prisma.

## Design Choices

The project focuses on simplicity and usability rather than full workflow execution.

Key architectural decisions include:

* frontend-only workflow simulation for fast iteration and visual feedback,
* SQLite for lightweight local persistence,
* Zustand for centralized workflow state management,
* ReactFlow for visual graph editing,
* contextual validation and node highlighting to improve usability.
