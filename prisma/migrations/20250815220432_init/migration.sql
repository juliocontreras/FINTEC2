-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "ingresos" DOUBLE PRECISION,
    "gastos" DOUBLE PRECISION,
    "ahorro_actual" DOUBLE PRECISION,
    "nivel_actual" INTEGER,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Nivel" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "objetivo_euros" DOUBLE PRECISION NOT NULL,
    "contenido_educativo" TEXT,
    "condiciones_desbloqueo" TEXT,

    CONSTRAINT "Nivel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EstrategiaFinanciera" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "rentabilidad_esperada" DOUBLE PRECISION NOT NULL,
    "riesgo" TEXT,
    "condiciones_aplicacion" TEXT,

    CONSTRAINT "EstrategiaFinanciera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HistorialEconomico" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "patrimonio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HistorialEconomico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- AddForeignKey
ALTER TABLE "public"."HistorialEconomico" ADD CONSTRAINT "HistorialEconomico_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
