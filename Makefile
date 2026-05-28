dev:
	make install && \
	make prisma && \
	make -j2 front back

install:
	cd backend && npm install
	cd frontend && npm install

prisma:
	cd backend && npx prisma migrate dev

front:
	cd frontend && npm run dev

back:
	cd backend && npm run start:dev

studio:
	cd backend && npx prisma studio

clean:
	rm -rf frontend/node_modules
	rm -rf backend/node_modules

.PHONY: install front back dev prisma studio clean
