import ConfiguracaoBateriaSchema from "@/app/model/configuracao_bateria.js";
import Bateria from "@/app/model/bateria.js";

export const criarConfiguracaoBateria = async (req, res) => {
    try {
        const novaConfiguracao = new ConfiguracaoBateriaSchema(req.body);
        await novaConfiguracao.save();

        // Atualiza a bateria associada com a nova configuração
        await Bateria.findByIdAndUpdate(req.body.bateriaId, { configuracao: novaConfiguracao._id });

        res.status(201).json(novaConfiguracao);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

export const listarConfiguracoesBateria = async (req, res) => {
    try {
        const configuracoes = await ConfiguracaoBateriaSchema.find().populate('bateriaId');
        res.status(200).json(configuracoes);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
export const atualizarConfiguracaoBateria = async (req, res) => {
    try {
        const configuracaoAtualizada = await ConfiguracaoBateriaSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!configuracaoAtualizada) {
            return res.status(404).json({ erro: "Configuração da bateria não encontrada" });
        }
        res.status(200).json(configuracaoAtualizada);
    }
    catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export const deletarConfiguracaoBateria = async (req, res) => {
    try {
        const configuracaoDeletada = await ConfiguracaoBateriaSchema.findByIdAndDelete(req.params.id);
        if (!configuracaoDeletada) {
            return res.status(404).json({ erro: "Configuração da bateria não encontrada" });
        }
        res.status(200).json({ mensagem: "Configuração da bateria deletada com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
