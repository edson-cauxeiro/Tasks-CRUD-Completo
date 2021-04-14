import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'

import api from '../../../services/api';

import './index.css';

interface ITasks {
  title: string;
  description: string;
}


const Tasks: React.FC = () => {

    const history = useHistory()
    const { id }  = useParams();
    const [model, setModel] = useState<ITasks>({
        title: '',
        description: ''
    })


    useEffect(() => {
      if (id !==  undefined){
        findTask(id)
      }
    }, [id])

    function updateModel (e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmitForm (e: ChangeEvent<HTMLFormElement>) {
       e.preventDefault()
       
       if (id !== undefined ) {
          
          const response = await api.put(`/tasks/${id}`, model)
          console.log(response)
       } else {

         
         const response = await api.post('/tasks', model)
         console.log(response)
       }
         
       back(); 
    }

    async function findTask (id: string) {
      const response = await api.get(`/tasks/${id}`)
      setModel({
        title: response.data.title,
        description: response.data.description
      })
    }

    function back () {
      history.goBack()
    }

  return (
    <div className="container">
      <br/>
      <div className="task-header">
        <h3>New Task</h3>
        <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
      </div>
      <br />
      <div className="conatiner">
        <Form onSubmit={onSubmitForm} >
            <Form.Group>
                <Form.Label>Titulo</Form.Label>
                <Form.Control type="text" name="title" 
                  placeholder="Titulo da Tarefa" 
                  value={model.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                />              
            </Form.Group>

            <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control as="textarea" rows={3} 
                   name="description"
                   value={model.description}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                />
            </Form.Group>       
            <Button variant="primary" type="submit">
                Salvar
            </Button>
        </Form>
      </div>

    </div>
  );
}

export default Tasks;