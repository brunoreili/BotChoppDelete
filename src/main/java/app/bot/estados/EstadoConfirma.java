package app.bot.estados;

import app.bot.cliente.Cliente;
import app.bot.comanda.Comanda;
import app.bot.comanda.ComandaRepository;
import app.bot.comanda.ItemComanda;
import app.bot.comanda.ItemComandaRepository;
import app.bot.comanda.ItemPedido;
import app.bot.comanda.ItemPedidoRepository;
import org.springframework.context.ApplicationContext;

public class EstadoConfirma extends Estado{
    
    private final ComandaRepository comandaRepository; 
    private final ItemComandaRepository itemComandaRepository;
    private final ItemPedidoRepository itemPedidoRepository;
    private final Cliente cliente;
    private final Comanda comanda;
    private final String produto;
    private final int quantidade;
    private final double valor;
    

    public EstadoConfirma(ApplicationContext context, Cliente cliente, Comanda comanda, String produto, int quantidade, double valor) {
        super(context);
        this.cliente = cliente;
        this.comanda = comanda;
        this.produto = produto;
        this.quantidade = quantidade;
        this.valor = valor;
        this.comandaRepository = context.getBean(ComandaRepository.class);
        this.itemComandaRepository = context.getBean(ItemComandaRepository.class);
        this.itemPedidoRepository = context.getBean(ItemPedidoRepository.class);
    }

    @Override
    public void processaMensagem(String mensagem) {

        try{          
            switch (mensagem.trim()) {
                case "1":
                    salvaItem();
                    comanda.setPedidoAberto(true);
                    mensagemResposta = "Pedido confirmado, " + cliente.getFirst_name() + "!" + System.lineSeparator() +
                                       "Agora é só aguardar que logo entregaremos na sua mesa." + System.lineSeparator() +
                                       "Se precisar de alguma coisa é só me chamar!" + System.lineSeparator() +
                                       "1 - Olhar cardápio" + System.lineSeparator() +
                                       "2 - Olhar/Fechar a comanda";
                    proximoEstado = new EstadoInicial(context, cliente, comanda);
                    break;
                case "2":
                    salvaItem();                                      
                    mensagemResposta = "Boa, " + cliente.getFirst_name() + "!" + System.lineSeparator() +
                                       "O que mais você gostaria de pedir?" + System.lineSeparator() +
                                       "1 - Para BEBIDAS" + System.lineSeparator() +
                                       "2 - Para ESPETINHOS" + System.lineSeparator() +
                                       "3 - Para PORÇÕES";
                    proximoEstado = new EstadoEscolhendo(context, cliente, comanda);
                    break;
                default:
                    mensagemResposta = "Por favor, escolha uma opção válida!";
                    proximoEstado = this;
                    break;
            }
        }
        catch(Exception e){
            mensagemResposta = "Por favor, escolha uma opção válida!";
            proximoEstado = this;
        }
        
    }
            
            public void salvaItem(){
                ItemComanda item = new ItemComanda();
                item.setCliente(cliente);
                item.setNome(produto);
                item.setQuantidade(quantidade);
                item.setValor(valor);
                itemComandaRepository.save(item);
                
                ItemPedido pedido = new ItemPedido();
                pedido.setCliente(cliente);
                pedido.setNome(produto);
                pedido.setQuantidade(quantidade);
                pedido.setValor(valor);
                itemPedidoRepository.save(pedido);
                
                comanda.setTotal(comanda.getTotal() + valor);
                comandaRepository.save(comanda);
            }
    
}