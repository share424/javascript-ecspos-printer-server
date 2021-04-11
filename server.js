const escpos = require('escpos');
// install escpos-usb adapter module manually
escpos.USB = require('escpos-usb');


const app = require('nanoexpress')();
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    return res.send({ status: 'ok' });
});

app.post('/print', (req, res) => {
    const body = JSON.parse(req.body);
    console.log(body);
    print(body.products, body.cash);
    return res.send({ status: 'ok' })
});

app.listen(3000);

const print = function(products, cash) {
    const device  = new escpos.USB();
    
    const options = { 
        encoding: "GB18030" /* default */,
        width: 48
    }
    
    const printer = new escpos.Printer(device, options);
    let line = '';
    let line2 = '';
    for(let i = 0; i<48; i++) {
        line += '=';
        line2 += '-';
    }
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "November", "Desember"];
    const today = new Date();
    const date = `${days[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`
    device.open(function(error){
    printer
        .font('A')
        .size(0, 0)
        .align("CT")
        .text("TOKO LABA II")
        .text("JL. MAHONI, PASAR GALIRAN KLUNGKUNG")
        .text("TELP/WA: 081933116123")
        .align("LT")
        .text(line2)
        .text(date)
        .text(line);
    let total = 0;
    products.forEach(product => {
        printer
            .text(product.name)
            .table([`${product.qty}${product.unit} X`, product.price.toLocaleString(), (product.price*product.qty).toLocaleString()]);
        total += product.price * product.qty;
    });
    printer
        .table(["", "", "----------------"])
        .table(["", "Total", total.toLocaleString()])
        .table(["", "Tunai", cash.toLocaleString()])
        .table(["", "", "----------------"])
        .table(["", "Kembali", (cash-total).toLocaleString()])
        .newLine()
        .align("CT")
        .text("TERIMA KASIH")
        .cut()
        .close();
    });

}