package unl.examen.base.controller.dao.dao_models;

import unl.examen.base.controller.dao.AdapterDao;
import unl.examen.base.models.Auto;
import unl.examen.base.models.MarcaEnum;

public class DaoAuto extends AdapterDao<Auto> {
    private Auto obj;
    public DaoAuto() {
        super(Auto.class);
    }
    public Auto getObj() {
        if (obj == null)
            this.obj = new Auto();
        return this.obj;
    }

    public void setObj(Auto obj) {
        this.obj = obj;
    }

    public Boolean save() {
        try {
            obj.setId(listAll().getLength()+1);

            
            this.persist(obj);
            return true;
        } catch (Exception e) {
            //TODO
            return false;
            // TODO: handle exception
        }
    }

    

    public static void main(String[] args) {
        DaoAuto de = new DaoAuto();
        de.getObj().setId(de.listAll().getLength() + 1);
        de.getObj().setMatricula("1234");
        de.getObj().setMarca(MarcaEnum.TOYOTA);
        
        

        if (de.save())
            System.out.println("GUARDADO");
        else
            System.out.println("Hubo un error");
    }

}
