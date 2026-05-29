all:
	$(MAKE) install && \
	$(MAKE) prisma && \
	$(MAKE) dev

install:
	@echo "Installing backend dependencies..."
	cd backend && npm install

	@echo "Installing frontend dependencies..."
	cd frontend && npm install

prisma:
	@echo "Generating Prisma client and syncing database..."
	cd backend && npx prisma generate
	cd backend && npx prisma db push

studio:
	cd backend && npx prisma studio

front:
	cd frontend && npm run dev

back:
	cd backend && npm run start:dev

dev:
	@echo "Starting frontend and backend..."
	$(MAKE) -j2 front back

clean:
	rm -rf frontend/node_modules
	rm -rf backend/node_modules

re:
	$(MAKE) clean && \
	$(MAKE) all

.PHONY: all install prisma studio front back dev clean re
