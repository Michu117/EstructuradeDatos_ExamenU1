import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { Button, ComboBox, DatePicker, Dialog, Grid, GridColumn, GridItemModel, NumberField, TextField, VerticalLayout } from '@vaadin/react-components';
import { Notification } from '@vaadin/react-components/Notification';
import { AutoServices, TaskService } from 'Frontend/generated/endpoints';
import { useSignal } from '@vaadin/hilla-react-signals';
import handleError from 'Frontend/views/_ErrorHandler';
import { Group, ViewToolbar } from 'Frontend/components/ViewToolbar';

import { useDataProvider } from '@vaadin/hilla-react-crud';
import Auto from 'Frontend/generated/unl/examen/base/models/Auto';
import { useCallback, useEffect, useState } from 'react';

export const config: ViewConfig = {
  title: 'Auto',
  menu: {
    icon: 'vaadin:clipboard-check',
    order: 1,
    title: 'Auto',
  },
};


type AutoEntryFormProps = {
  onAutoCreated?: () => void;
};


//GUARDAR Auto
function AutoEntryForm(props: AutoEntryFormProps) {
  const matricula = useSignal('');
  const marca = useSignal('');
  const album = useSignal('');
  
  const createAuto = async () => {
    try {
      if (matricula.value.trim().length > 0) {
        
        await AutoServices.create(matricula.value, marca.value);
        if (props.onAutoCreated) {
          props.onAutoCreated();
        }
        matricula.value = '';
        marca.value = '';

        dialogOpened.value = false;
        Notification.show('Auto creada', { duration: 5000, position: 'bottom-end', theme: 'success' });
      } else {
        Notification.show('No se pudo crear, faltan datos', { duration: 5000, position: 'top-center', theme: 'error' });
      }

    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };
  
  

  let listaMarca = useSignal<String[]>([]);
  useEffect(() => {
    AutoServices.listMarca().then(data =>
        //console.log(data)
        listaMarca.value = data
    );
  }, []);
  const dialogOpened = useSignal(false);
  return (
    <>
      <Dialog
        modeless
        headerTitle="Nuevo Auto"
        opened={dialogOpened.value}
        onOpenedChanged={({ detail }) => {
          dialogOpened.value = detail.value;
        }}
        footer={
          <>
            <Button
              onClick={() => {
                dialogOpened.value = false;
              }}
            >
              Cancelar
            </Button>
            <Button onClick={createAuto} theme="primary">
              Registrar
            </Button>
            
          </>
        }
      >
        <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
          <TextField label="Matricula del auto" 
            placeholder="Ingrese la Matricula del auto"
            aria-label="Matricula del auto"
            value={matricula.value}
            onValueChanged={(evt) => (matricula.value = evt.detail.value)}
          />
          
            <ComboBox label="Marca del auto" 
            items={listaMarca.value}
            placeholder='Seleccione una Marca'
            aria-label='Seleccione una Marca de la lista'
            value={marca.value}
            onValueChanged={(evt) => (marca.value = evt.detail.value)}
            />
        </VerticalLayout>
      </Dialog>
      <Button
            onClick={() => {
              dialogOpened.value = true;
            }}
          >
            Agregar
          </Button>
    </>
  );
}




//LISTA DE AutoES
export default function AutoView() {
  
  const dataProvider = useDataProvider<Auto>({
    list: () => AutoServices.listAuto(),
  });

  

  function indexIndex({model}:{model:GridItemModel<Auto>}) {
    return (
      <span>
        {model.index + 1} 
      </span>
    );
  }

  return (

    <main className="w-full h-full flex flex-col box-border gap-s p-m">

      <ViewToolbar title="Lista de Autos">
        <Group>
          <AutoEntryForm onAutoCreated={dataProvider.refresh}/>
        </Group>
      </ViewToolbar>
      <Grid dataProvider={dataProvider.dataProvider}>
        <GridColumn renderer={indexIndex} header="Nro" />
        <GridColumn path="matricula" header="Matricula" />
        <GridColumn path="marca" header="Marca" />
        
      </Grid>
    </main>
  );
}
