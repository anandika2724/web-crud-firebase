const db = firebase.database().ref("siswa");

document.getElementById("siswaForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const pesan = document.getElementById("pesan").value;

  const newData = db.push();
  newData.set({
    nama: nama,
    pesan: pesan
  });

  document.getElementById("siswaForm").reset();
});

function tampilkanData() {
  db.on("value", function(snapshot) {
    const container = document.getElementById("dataContainer");
    container.innerHTML = "";

    snapshot.forEach(function(child) {
      const data = child.val();
      const key = child.key;

      const div = document.createElement("div");
      div.innerHTML = `
        <strong>${data.nama}</strong>: ${data.pesan}
        <br />
        <button onclick="hapusData('${key}')">Hapus</button>
      `;
      container.appendChild(div);
    });
  });
}

function hapusData(key) {
  db.child(key).remove();
}

tampilkanData();
