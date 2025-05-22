package unl.examen.base.models;

public class Auto {
    private Integer id;
    private String matricula;
    private MarcaEnum marca;

    public MarcaEnum getMarca() {
        return this.marca;
    }

    public void setMarca(MarcaEnum marca) {
        this.marca = marca;
    }


    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMatricula() {
        return this.matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    
}
