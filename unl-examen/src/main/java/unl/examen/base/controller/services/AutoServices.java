package unl.examen.base.controller.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import unl.examen.base.controller.dao.dao_models.DaoAuto;
import unl.examen.base.models.Auto;
import unl.examen.base.models.MarcaEnum;


@BrowserCallable
@Transactional(propagation = Propagation.REQUIRES_NEW)
@AnonymousAllowed

public class AutoServices {
    private DaoAuto db;
    public AutoServices() {
        db = new DaoAuto();
    }

    public void create(@NotEmpty @Size(max = 8) String matricula, @NotEmpty String marca) throws Exception{
        if(matricula.trim().length() > 0 && marca.trim().length() > 0)
            db.getObj().setMatricula(matricula);
            db.getObj().setMarca(MarcaEnum.valueOf(marca));
            
            
            if(!db.save())
                throw new  Exception("No se pudo guardar los datos de Cancion");
    }

    

    
    public List<String> listMarca() {
        List<String> lista = new ArrayList<>();
        for(MarcaEnum r: MarcaEnum.values()) {
            lista.add(r.toString());
        }        
        return lista;
    }

    public List<HashMap> listAuto(){
        List<HashMap> lista = new ArrayList<>();
        if(!db.listAll().isEmpty()) {
            Auto [] arreglo = db.listAll().toArray();
           
            for(int i = 0; i < arreglo.length; i++) {
                
                HashMap<String, String> aux = new HashMap<>();
                aux.put("id", arreglo[i].getId().toString(i));                
                aux.put("matricula", arreglo[i].getMatricula());
                aux.put("marca", arreglo[i].getMarca().toString());
                lista.add(aux);
            }
        }
        return lista;
    }

    public List<Auto> listAll() {
        return (List<Auto>) db.listAll();
    }
    

    
}
