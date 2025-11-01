document.addEventListener('DOMContentLoaded', () => {
    // --- Tangkap semua elemen dari HTML, biar bisa di-utak-atik ---
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const priorityInput = document.getElementById('priority-input');
    const dueDateInput = document.getElementById('due-date-input');
    const todoList = document.getElementById('todo-list');
    const doneList = document.getElementById('done-list');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const currentDateEl = document.getElementById('current-date');
    const currentTimeEl = document.getElementById('current-time');

    // --- Siapin Wadah Buat Data-datanya ---
    // Cek localStorage, ada data lama gak? Kalo gak ada, yaudah bikin array kosong aja.
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // --- Kumpulan Fungsi Ajaib ---

    /**
     * Ini dia jurus andalan: simpen data ke localStorage biar gak ilang pas di-refresh.
     */
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    /**
     * Biar cakep, kita kasih warna beda buat tiap prioritas. 
     * Fungsi ini tugasnya milih warna yang pas.
     */
    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High':
                return 'bg-red-500 text-red-50'; // Merah buat yang genting!
            case 'Medium':
                return 'bg-yellow-500 text-yellow-50'; // Kuning buat yang lumayan
            case 'Low':
            default:
                return 'bg-green-500 text-green-50'; // Ijo buat yang santai
        }
    };

    /**
     * Nah ini dia otaknya, fungsi buat nampilin semua tugas ke layar.
     * Dia misahin mana yang "To Do" dan mana yang "Done".
     */
    const renderTasks = () => {
        // Bersih-bersih dulu, kosongin list lama sebelum nampilin yang baru.
        todoList.innerHTML = '';
        doneList.innerHTML = '';

        // Pisahin tugas jadi dua kubu: yang belum dan yang sudah.
        const pendingTasks = tasks.filter(task => !task.completed);
        const completedTasks = tasks.filter(task => task.completed);

        // --- Bagian ini buat nampilin tugas-tugas yang masih jadi PR ---
        if (pendingTasks.length === 0) {
            todoList.innerHTML = `<tr><td colspan="4" class="text-center text-slate-500 py-8">Hore, tidak ada tugas! Waktunya ngopi.</td></tr>`;
        } else {
            pendingTasks.forEach(task => {
                const row = document.createElement('tr');
                row.className = 'border-b border-slate-700';
                row.dataset.id = task.id;

                const formattedDate = task.dueDate ?
                    new Date(task.dueDate + 'T00:00:00').toLocaleDateString('id-ID', {
                        year: 'numeric', month: 'short', day: 'numeric'
                    }) :
                    'Kapan-kapan';
                
                // Cek tanggal, udah telat belom nih ngerjainnya?
                const isOverdue = task.dueDate && new Date(task.dueDate) < new Date().setHours(0,0,0,0);
                
                row.innerHTML = `
                    <td class="p-4">${task.text}</td>
                    <td class="p-4">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${getPriorityClass(task.priority)}">
                            ${task.priority}
                        </span>
                    </td>
                    <td class="p-4 ${isOverdue ? 'text-red-400 font-semibold' : ''}">${formattedDate} ${isOverdue ? '(Telat!)' : ''}</td>
                    <td class="p-4 whitespace-nowrap">
                        <button class="complete-btn font-semibold text-white px-3 py-2 rounded-lg transition text-sm bg-green-600 hover:bg-green-700">Selesai</button>
                        <button class="delete-btn bg-red-600 hover:bg-red-700 font-semibold text-white px-3 py-2 rounded-lg transition text-sm ml-2">Hapus</button>
                    </td>
                `;
                todoList.appendChild(row);
            });
        }

        // --- Kalo yang ini buat nampilin tugas yang udah kelar, aseek ---
        if (completedTasks.length === 0) {
            doneList.innerHTML = `<tr><td colspan="4" class="text-center text-slate-500 py-8">Belum ada yang kelar, semangat!</td></tr>`;
        } else {
             completedTasks.forEach(task => {
                const row = document.createElement('tr');
                row.className = 'border-b border-slate-700 opacity-60'; // Bikin agak transparan biar beda
                row.dataset.id = task.id;
                
                 const formattedDate = task.dueDate ?
                    new Date(task.dueDate + 'T00:00:00').toLocaleDateString('id-ID', {
                        year: 'numeric', month: 'short', day: 'numeric'
                    }) :
                    'Kapan-kapan';

                row.innerHTML = `
                    <td class="p-4 line-through">${task.text}</td>
                    <td class="p-4">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${getPriorityClass(task.priority)}">
                            ${task.priority}
                        </span>
                    </td>
                    <td class="p-4">${formattedDate}</td>
                    <td class="p-4 whitespace-nowrap">
                        <button class="complete-btn font-semibold text-white px-3 py-2 rounded-lg transition text-sm bg-yellow-500 hover:bg-yellow-600">Batalin</button>
                        <button class="delete-btn bg-red-600 hover:bg-red-700 font-semibold text-white px-3 py-2 rounded-lg transition text-sm ml-2">Hapus</button>
                    </td>
                `;
                doneList.appendChild(row);
            });
        }
    };

    /**
     * Kalo tombol '+' diklik, fungsi ini yang jalan buat nambahin tugas baru.
     */
    const addTask = (e) => {
        e.preventDefault(); // Jangan refresh halaman dong, nanti datanya ilang (walaupun udah ada localStorage sih hehe).

        const taskText = todoInput.value.trim();
        const priority = priorityInput.value;
        const dueDate = dueDateInput.value;

        if (taskText === '') {
            alert('Tugasnya diisi dulu dong, masa kosong?');
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            priority: priority,
            dueDate: dueDate,
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.unshift(newTask); // Biar tugas baru nongol di paling atas, kita pake unshift.
        saveTasks(); // Langsung simpen!
        renderTasks(); // Tampilanin lagi listnya.

        // Kalo udah, kosongin lagi formnya biar bisa nambah tugas baru lagi.
        todoForm.reset();
    };

    /**
     * Ini buat ngatur kalo tombol 'Selesai', 'Batalin', atau 'Hapus' di-klik.
     */
    const handleTaskActions = (e) => {
        const target = e.target;
        const parentRow = target.closest('tr');
        if (!parentRow || !parentRow.dataset.id) return; // Kalo yg di-klik bukan tombol di dalem baris, cuekin aja.

        const taskId = Number(parentRow.dataset.id);

        if (target.classList.contains('delete-btn')) {
            // Bye-bye tugas!
            tasks = tasks.filter(task => task.id !== taskId);
        } else if (target.classList.contains('complete-btn')) {
            // Bolak-balik status completed: dari true ke false, atau sebaliknya.
            tasks = tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            );
        }

        saveTasks();
        renderTasks();
    };

    /**
     * Tombol kiamat: hapus semua tugas. Hati-hati make-nya.
     */
    const deleteAllTasks = () => {
        if (tasks.length > 0 && confirm('Yakin nih mau hapus semua? Gak bisa balik lagi lho.')) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    };
    
    /**
     * Bikin jam & tanggal digital yang jalan terus, biar keren.
     */
    const updateTime = () => {
        const now = new Date();
        currentDateEl.textContent = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        currentTimeEl.textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };


    // --- Pasang Kuping buat Dengerin Aksi User ---
    todoForm.addEventListener('submit', addTask);
    // Daripada tiap tombol dikasih event, mending satu buat semua. Lebih hemat!
    document.querySelector('.w-full.max-w-4xl').addEventListener('click', handleTaskActions);
    deleteAllBtn.addEventListener('click', deleteAllTasks);
    
    // --- Oke, Semua Siap, Langsung Jalanin Aplikasinya! ---
    updateTime(); // Pas pertama kali buka, langsung update waktunya.
    setInterval(updateTime, 1000); // Biar jam-nya jalan terus, update tiap detik.
    renderTasks(); // Tampilkan semua tugas yang udah kesimpen pas halaman di-load.
});

