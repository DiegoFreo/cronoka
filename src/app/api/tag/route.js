import { NextResponse } from "next/server";
import conectDB from '../../../lib/mongodb';
import  Tag from  '../../model/tags';
import { criarTag, atualizarTag, deletarTag } from  '../../controller/tagsController';   

export async function POST(request) {
    try{
    await conectDb();
    const dados = await request.json();
    const result = await criarTag(dados);
    return NextResponse.json(result.data || { error: result.error }, { status: result.status });
}    catch(err){
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
export async function GET() {
    try {
        await conectDb();
        const tags = await Tag.find();
        return NextResponse.json(tags); // ✅ retorno obrigatório
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 }); // ✅ retorno no erro também
      }
}
export async function PUT(request) {
    try{
    await conectDb();
    const req = await request.json();
    req.params = { id: req.id };    
    const res = {
        status: (status) => ({
            json: (data) => NextResponse.json(data, { status }),    
        }),
    };
    return atualizarTag(req, res);
}    catch(err){
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
export async function DELETE(request) {
    try{   
    await conectDb();
    const req = await request.json();
    req.params = { id: req.id };    
    const res = {
        status: (status) => ({
            json: (data) => NextResponse.json(data, { status }),    
        }),
    };
    return deletarTag(req, res);
}    catch(err){
    console.log(err)
    return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
