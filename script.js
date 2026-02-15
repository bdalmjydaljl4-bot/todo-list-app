let students = [];

let nameInput = document.getElementById("nameInput");
let gradeInput = document.getElementById("gradeInput");
let result = document.getElementById("result");
let checkBtn = document.getElementById("checkBtn");
let studentsTableBody = document.querySelector("#studentsTable tbody");
let averageCell = document.getElementById("averageCell");

function checkResult() {
    let name = nameInput.value;
    let grade = Number(gradeInput.value);

    if (name === "") {
        result.textContent = "⚠️ اكتب اسمك!";
        result.style.color = "red";
        nameInput.classList.remove("shake");
        void nameInput.offsetWidth;
        nameInput.classList.add("shake");
        return;
    }

    if (gradeInput.value === "" || grade < 0 || grade > 100) {
        result.textContent = "⚠️ اكتب درجة صحيحة بين 0 و 100";
        result.style.color = "red";
        gradeInput.classList.remove("shake");
        void gradeInput.offsetWidth;
        gradeInput.classList.add("shake");
        return;
    }

    students.push({ name, grade });

    let rating = "";
    let rowClass = "";

    if (grade === 100) {
        rating = "👑 علامة كاملة";
        rowClass = "perfect";
    } else if (grade >= 95) {
        rating = "🌟 ممتاز جدًا";
        rowClass = "veryExcellent";
    } else if (grade >= 90) {
        rating = "🏆 ممتاز";
        rowClass = "excellent";
    } else if (grade >= 80) {
        rating = "💪 جيد جدًا";
        rowClass = "good";
    } else if (grade >= 70) {
        rating = "🙂 جيد";
        rowClass = "average";
    } else if (grade >= 60) {
        rating = "😐 مقبول";
        rowClass = "pass";
    } else {
        rating = "⚠️ راسب";
        rowClass = "fail";
    }

    result.textContent = `${rating} يا ${name}`;
    result.style.color = "";

    let row = document.createElement("tr");
    row.className = rowClass;

    row.innerHTML = `
        <td>${students.length}</td>
        <td>${name}</td>
        <td>${grade}</td>
        <td>${rating}</td>
        <td>
            <button class="editBtn">تعديل</button>
            <button class="deleteBtn">حذف</button>
        </td>
    `;

    studentsTableBody.appendChild(row);

    row.querySelector(".editBtn").addEventListener("click", () => {
        nameInput.value = name;
        gradeInput.value = grade;

        let index = students.findIndex(s => s.name === name && s.grade === grade);
        if (index > -1) students.splice(index, 1);
        row.remove();

        let total = students.reduce((sum, s) => sum + s.grade, 0);
        averageCell.textContent = students.length ? (total / students.length).toFixed(2) : 0;
    });

    row.querySelector(".deleteBtn").addEventListener("click", () => {
        let index = students.findIndex(s => s.name === name && s.grade === grade);
        if (index > -1) students.splice(index, 1);
        row.remove();

        let total = students.reduce((sum, s) => sum + s.grade, 0);
        averageCell.textContent = students.length ? (total / students.length).toFixed(2) : 0;
    });

    let total = students.reduce((sum, s) => sum + s.grade, 0);
    averageCell.textContent = (total / students.length).toFixed(2);

    nameInput.value = "";
    gradeInput.value = "";
    nameInput.focus();
}

checkBtn.addEventListener("click", checkResult);
nameInput.addEventListener("keydown", e => { if (e.key === "Enter") checkResult(); });
gradeInput.addEventListener("keydown", e => { if (e.key === "Enter") checkResult(); });
