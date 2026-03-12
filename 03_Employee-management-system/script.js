// Employee Database Management System (Frontend only)
// Note: Adding/Deleting employees here updates data only in memory.
// Changes are not persistent and will reset on page refresh.

(async function () {
    
    // Fetch initial employee data from data.json (static file)
 
    const data = await fetch('data.json')
    const res = await data.json()
    
    let employees = res
    
    // Keep track selected employee
    
    let selectedEmployeeId = employees[0].id
    let selectedEmployee = employees[0]

    // Dom elements form employee list and employee details

    const employeeList = document.querySelector(".employee__names--list");
    const employeeInfo = document.querySelector(".employee__single--info")

    // Add employee Logic
    const createEmployee = document.querySelector(".createEmployee");
    const addEmployeeModel = document.querySelector(".addEmployee");
    const addEmployeeForm = document.querySelector(".addEmployee_create");
    

    // Show add employee model

    createEmployee.addEventListener("click", () => {
        addEmployeeModel.style.display = "flex"
    })

    addEmployeeModel.addEventListener("click", (e) => {
        if (e.target.className === "addEmployee") {
            addEmployeeModel.style.display = "none"
        }
    })
    
    // Restrict DOB input minimum 18 years old

    const dobInput = document.querySelector(".addEmployee_create--dob");

    dobInput.max = `${new Date().getFullYear() - 18} - ${new Date().toISOString().slice(5, 10)}`;

    // Handle add employee form submission

    addEmployeeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Collect form data

        const formData = new formData(addEmployeeForm);

        const values = [...formData.entries()]
        let empData = {};

        values.forEach((val) => {
            empData[val[0]] = val[1];
        });


        //  Generate new Employee data

        empData.id = employees[employees.length - 1].id + 1;
        
        empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);

        empData.imageUrl = empData.imageUrl || "gfg.png";

        // Push into local employee array( not saved to files)
        employees.push(empData);

        // Rerender employee list 
        renderEmployee();


        // Reset form and close model
        addEmployeeForm.reset();
        addEmployeeModel.style.display = "none"
    });


    // Select and delate employee logic

    employeeList.addEventListener("click", (e) => {
        // Select employee

        if (e.target.className === "SPAN" && selectedEmployeeId !== e.target.id) {
            selectedEmployeeId = e.target.id;
            renderEmployees();
            renderSingleEmployee();
        }

        // Delete employee

        if (e.target.className === "I") {
            employees = employees.filter((emp) => {
                String(emp.id) !== e.target.parentNode.id
            })

            // If deleted employee is selected employee, updated selection

            if (String(selectedEmployeeId) === e.target.parentNode.id) {
                selectedEmployeeId = employees[0]?.id || -1;
                selectedEmployee = employees[0] || {};
                renderSingleEmployee();
            }
            renderEmployees();
        }
    })

    // Render all employee
    const renderEmployee = () => {
        employeeList.innerHTML = "";

        employees.forEach((emp) => {
            const employee = document.createElement("span");
            employee.classList.add("employee__names--item");

            // Highlight selected employee

            if (parseInt(selectedEmployeeId, 10) === emp.id) {
                employee.classList.add("selected");
                selectedEmployee = emp;
            }

            // Render employee name and delete button

            employee.setAttribute("id", emp.id);
            employee.innerHTML = `${emp.firstName} ${emp.lastName}
            <i class="employeeDelete"> &#10060;</i>`;

            employeeList.append(employee);
        });
    };

    // Render Single employee

    const renderSingleEmployee = () => {
        // No employee selected

        if (selectedEmployeeId === -1) {
            employeeInfo.innerHTML = "";
            return;
        }
    
        // Render selected employee details

        employeeInfo.innerHTML = `
        <img src="${selectedEmployee.imageUrl}/>
        <span class="employee__single--heading>
        ${selectedEmployee.firstName} ${selectedEmployee.lastName}
        (${selectedEmployee.age})
        </span>

        <span> ${selectedEmployee.address} </span>
        <span> ${selectedEmployee.email} </span>
        <span> Mobile: ${selectedEmployee.contactNumber} </span>
        <span> DOB: ${selectedEmployee.dob} </span>
        `;
    };
    renderEmployee();

    if (selectedEmployee) renderSingleEmployee();
    
})();
