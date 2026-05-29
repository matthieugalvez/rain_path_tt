all:
	make install && \
	make prisma && \
	make dev

install:
	cd backend && npm install
	cd frontend && npm install

prisma:
	cd backend && npx prisma migrate dev

studio:
	cd backend && npx prisma studio

front:
	cd frontend && npm run dev

back:
	cd backend && npm run start:dev

dev:
	make -j2 front back

clean:
	rm -rf frontend/node_modules
	rm -rf backend/node_modules

re:
	make clean && \
	make all

.PHONY: all install front back dev prisma studio clean
