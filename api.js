document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const dataTable = document
      .getElementById("dataTable")
      .getElementsByTagName("tbody")[0];

    // Function to fetch dummy data from JSONPlaceholder API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Function to display data in the table
    const displayData = async () => {
      const data = await fetchData();
      dataTable.innerHTML = "";
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>${item.userId}</td>
                `;
        dataTable.appendChild(row);
      });
    };

    // Initial data display
    displayData();

    // Event listener for search input
    searchInput.addEventListener("input", () => {
      const searchText = searchInput.value.toLowerCase();
      const rows = dataTable.getElementsByTagName("tr");
      for (let i = 0; i < rows.length; i++) {
        const rowData = rows[i].getElementsByTagName("td");
        let rowVisible = false;
        for (let j = 0; j < rowData.length; j++) {
          const cellValue = rowData[j].textContent.toLowerCase();
          if (cellValue.includes(searchText)) {
            rowVisible = true;
            break;
          }
        }
        rows[i].style.display = rowVisible ? "" : "none";
      }
    });
  });