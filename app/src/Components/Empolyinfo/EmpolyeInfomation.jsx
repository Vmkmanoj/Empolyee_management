import React, { useState, useEffect } from "react";
import Update from "../Update/Update";


function EmpolyeInformation({ count, setCount ,create,SetCreate}) {
    const [employees, setEmployees] = useState([]); // State to store employee data

    
    const [updateval,setUpdateval] = useState("ShowDetails")

    const [id,setId] = useState();

   

    const handleDelete = async (employeeId) => {
        try {
            const response = await fetch(`http://localhost:3000/Empolye_detials/${employeeId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Failed to delete employee with ID: ${employeeId}`);
            }

            // Update the state to remove the deleted employee
            setEmployees((prevEmployees) =>
                prevEmployees.filter((employee) => employee._id !== employeeId)
            );

            // Optional: Update the count after deletion
            setCount((prevCount) => prevCount - 1);

            console.log(`Employee with ID: ${employeeId} deleted successfully`);
        } catch (error) {
            console.error("Error deleting employee:", error.message);
        }
    };

    

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:3000/Empolye_detials");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json(); // Parse the JSON response

                // Check if Empolye_info exists and is an array
                if (Array.isArray(data.Empolye_info)) {
                    setEmployees(data.Empolye_info); // Set the employee data
                    setCount(data.count); // Set the count
                } else {
                    console.error("Empolye_info is not an array", data);
                }
            } catch (error) {
                console.error("Error fetching employee details:", error.message);
            }
        };

        fetchEmployees();
    }, []);

    return (
    <>
    {updateval==="ShowDetails" ? ( <div className="flex">
            {/* Grid Layout for Table */}
            <div style={styles.tableWrapper}>
                {/* Header Row */}
                <div style={styles.gridHeader}>
                    <div>Name</div>
                    <div>Email</div>
                    <div>Phone</div>
                    <div>Designation</div>
                    <div>Gender</div>
                    <div>Course</div>
                    <div>Actions</div>
                </div>

                {/* Employee Data Rows */}
                {employees.length === 0 ? (
                    <div style={styles.gridRow}>
                        <div style={{ gridColumn: "span 8", textAlign: "center" ,width:"full" }}>Loading...</div>
                    </div>
                ) : (
                    employees.map((employee) => (
                        <div key={employee._id} style={styles.gridRow}>
                            <div>{employee.name}</div>
                            <div>{employee.email}</div>
                            <div className="ml-10">{employee.phone}</div>
                            <div className="ml-10">{employee.designation}</div>
                            <div className="ml-16">{employee.gender}</div>
                            <div className="ml-14">{employee.course}</div>
                            <div style={styles.actionButtons}>
                                {/* Delete Button */}
                                <button
                                    style={styles.deleteButton}
                                    onClick={() => handleDelete(employee._id)}
                                >
                                    Delete
                                </button>
                                {/* Update Button */}
                                <button
                                    style={styles.updateButton}
                                    onClick={(e) => 
                                    {setId(employee._id),setUpdateval("Update")}}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>):<div>

                    <Update employeeId={id}></Update>
        
            
        
            </div>}
       

        </>
    );
}

// Styles for the Grid layout
const styles = {
    tableWrapper: {
        display: "grid",
        gap: "10px",
        Weight:"1000px",
        padding: "10px",
    },
    gridHeader: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)", // 7 columns (6 data + 1 actions column)
        fontWeight: "bold",
        textAlign: "center",
        padding: "10px 0",
        backgroundColor: "#f4f4f4",
        borderBottom: "2px solid #ccc",
    },
    gridRow: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)", // Matches the header layout
        alignItems: "center",
        padding: "10px 0",
        borderBottom: "1px solid #ccc",
    },
    actionButtons: {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
    },
    deleteButton: {
        padding: "5px 10px",
        backgroundColor: "red",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    updateButton: {
        padding: "5px 10px",
        backgroundColor: "blue",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default EmpolyeInformation;

