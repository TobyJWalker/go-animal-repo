var sidebar_open = false;

function toggleSidebar() {
    if (sidebar_open) {
        document.getElementById("sidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        sidebar_open = false;
    } else {
        document.getElementById("sidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        sidebar_open = true;
    }
}