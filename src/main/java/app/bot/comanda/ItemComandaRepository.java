package app.bot.comanda;

import app.bot.cliente.Cliente;
import org.springframework.data.repository.CrudRepository;

public interface ItemComandaRepository extends CrudRepository<ItemComanda, Integer>{

    public Iterable<ItemComanda> findByCliente(Cliente cliente);
    
}