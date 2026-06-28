"use client";

import { useDeleteEmployee, useUpdateEmployee, useEmployees, useCreateEmployee } from "@/hooks/useEmployees";
export default function EmployeesPage() {
  const {data, isLoading, isError, error } = useEmployees({
    page: 0,
    size: 10,
  });

const createMutation = useCreateEmployee();

const handleTestCreate = async() => {
  try{
    await createMutation.mutateAsync({
      name:"Test User",
      email:`test${Date.now()}@example.com`,
      department:"IT",
    });
    alert("Created");
  } catch(e) {
    alert(e instanceof Error ? e.message : "Failed");
  }
}

const updateMutation = useUpdateEmployee();

const handleTestUpdate = async() =>{
  try{
    await updateMutation.mutateAsync({
      id : 15,
      payload: {
        name: "Kiara",
        email: "Kiara@gmail.com",
        department: "QA",
      },
    });
    alert("updated");
  }catch(e) {
    alert (e instanceof Error ? e.message : "Failed");
  }
};


const deleteMutation = useDeleteEmployee();

const handleTestDelete = async() =>{
  try{
    await deleteMutation.mutateAsync(16);
    alert("deleted");
  }catch(e) {
    alert(e instanceof Error ? e.message : "Failed");
  }
};


if(isLoading) return  <p>Loading...</p>
if(isError) return <p>{error.message}</p>;

  return (
    <div>
      <button onClick = {handleTestCreate} disabled ={createMutation.isPending}>
        {createMutation.isPending ? "Creating....":"Test create employee"}
      </button>
      <button onClick = {handleTestUpdate} disabled ={updateMutation.isPending}>
        Test update employee
      </button>
      <button onClick={handleTestDelete} disabled={deleteMutation.isPending}>
        {deleteMutation.isPending ? "Deleting....": "Test delete employee"}
      </button>
    <pre>{JSON.stringify(data?.content,null,2)}</pre>
    </div>
  );
}


