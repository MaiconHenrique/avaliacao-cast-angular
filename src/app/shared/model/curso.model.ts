import { CategoriaModel } from "./categoria.model";

export class CursoModel {
    categoria: CategoriaModel = new CategoriaModel;
    assunto!: string;
    datainicio!: Date;
    datatermino!: Date;
    qtdalunos!: number;
    id?: string;
}