function calcMatiere(td, ds, ex) {
    td = parseFloat(String(td).replace(",", ".")) || 0;
    ds = parseFloat(String(ds).replace(",", ".")) || 0;
    ex = parseFloat(String(ex).replace(",", ".")) || 0;
    return 0.1 * td + 0.2 * ds + 0.7 * ex;
}

function calcMatiereCC(ds, ex) {
    ds = parseFloat(String(ds).replace(",", ".")) || 0;
    ex = parseFloat(String(ex).replace(",", ".")) || 0;
    return 0.2 * ds + 0.8 * ex;
}

function colorerElement(id, valeur, max) {
    const el = document.getElementById(id);
    if (el) {
        if (valeur < max) {
            el.style.background = "#fee2e2";
            el.style.color = "#991b1b";
            el.style.fontWeight = "bold";
        } else {
            el.style.background = "#dcfce7";
            el.style.color = "#166534";
            el.style.fontWeight = "bold";
        }
    }
}

function getCredit(coef) { return coef * 2; }
function creditMatiere(moyenne, coef) { return moyenne >= 10 ? getCredit(coef) : 0; }
function creditModule(moyModule, creditsTotal, creditsMatieres) {
    return moyModule >= 10 ? creditsTotal : creditsMatieres;
}

function calculer() {

    if (!validerSaisies()) return;

    // ── Logique et multimédia ──
    let logique = calcMatiere(
        document.getElementById("logique_td").value,
        document.getElementById("logique_ds").value,
        document.getElementById("logique_ex").value
    );
    let techMultimedia = calcMatiere(
        document.getElementById("tech_ds").value,
        document.getElementById("tech_td").value,
        document.getElementById("tech_ex").value
    );
    let moyLogique = (logique * 1.5 + techMultimedia * 1.5) / 3;
    let cr_logique        = creditMatiere(logique, 1.5);
    let cr_techMultimedia = creditMatiere(techMultimedia, 1.5);
    let cr_log_total      = getCredit(1.5) + getCredit(1.5); // 6
    let cr_logMultimedia  = creditModule(moyLogique, cr_log_total, cr_logique + cr_techMultimedia);

    // ── Mathématiques 1 ──
    let algebre = calcMatiere(
        document.getElementById("alg_td").value,
        document.getElementById("alg_ds").value,
        document.getElementById("alg_ex").value
    );
    let analyse = calcMatiere(
        document.getElementById("ana_td").value,
        document.getElementById("ana_ds").value,
        document.getElementById("ana_ex").value
    );
    let moyMath = (algebre * 1.5 + analyse * 1.5) / 3;
    let cr_algebre    = creditMatiere(algebre, 1.5);
    let cr_analyse    = creditMatiere(analyse, 1.5);
    let cr_math_total = getCredit(1.5) + getCredit(1.5); // 6
    let cr_math       = creditModule(moyMath, cr_math_total, cr_algebre + cr_analyse);

    // ── Unité transversale (CC) ──
    let anglais  = calcMatiereCC(document.getElementById("ang_ds").value, document.getElementById("ang_ex").value);
    let techComm = calcMatiereCC(document.getElementById("techcomm_ds").value, document.getElementById("techcomm_ex").value);
    let moyTransversale = (anglais * 1 + techComm * 1) / 2;
    let cr_anglais            = creditMatiere(anglais, 1);
    let cr_techComm           = creditMatiere(techComm, 1);
    let cr_transversale_total = getCredit(1) + getCredit(1); // 4
    let cr_transversale       = creditModule(moyTransversale, cr_transversale_total, cr_anglais + cr_techComm);

    // ── Algorithmique et programmation 1 ──
    let algo = calcMatiere(
        document.getElementById("algo_td").value,
        document.getElementById("algo_ds").value,
        document.getElementById("algo_ex").value
    );
    let atelier = calcMatiere(
        document.getElementById("atelier_ds").value,
        document.getElementById("atelier_td").value,
        document.getElementById("atelier_ex").value
    );
    let moyAlgo = (algo * 2 + atelier * 1.5) / 3.5;
    let cr_algo          = creditMatiere(algo, 2);
    let cr_atelier       = creditMatiere(atelier, 1.5);
    let cr_algo_total    = getCredit(2) + getCredit(1.5); // 7
    let cr_algorithmique = creditModule(moyAlgo, cr_algo_total, cr_algo + cr_atelier);

    // ── Systèmes d'exploitation et architecture ──
    let sysExpl = calcMatiere(
        document.getElementById("sys_ds").value,
        document.getElementById("sys_td").value,
        document.getElementById("sys_ex").value
    );
    let sysLogique = calcMatiere(
        document.getElementById("syslog_ds").value,
        document.getElementById("syslog_td").value,
        document.getElementById("syslog_ex").value
    );
    let moySystème = (sysExpl * 1.5 + sysLogique * 2) / 3.5;
    let cr_sysExpl       = creditMatiere(sysExpl, 1.5);
    let cr_sysLogique    = creditMatiere(sysLogique, 2);
    let cr_systeme_total = getCredit(1.5) + getCredit(2); // 7
    let cr_systeme       = creditModule(moySystème, cr_systeme_total, cr_sysExpl + cr_sysLogique);

    // ── Moyenne générale ──
    let moyenne = (moyLogique * 3 + moyMath * 3 + moyTransversale * 2 + moyAlgo * 3.5 + moySystème * 3.5) / 15;

    // ── Crédit total ──
    let creditTotal = cr_logMultimedia + cr_math + cr_transversale + cr_algorithmique + cr_systeme;
    let creditMax   = cr_log_total + cr_math_total + cr_transversale_total + cr_algo_total + cr_systeme_total;

    // ════════════════════════════════
    // AFFICHAGE MOYENNES MATIÈRES
    // ════════════════════════════════
    document.getElementById("m_logique").innerHTML        = logique.toFixed(2);
    document.getElementById("m_techMultimedia").innerHTML = techMultimedia.toFixed(2);
    document.getElementById("m_algebre").innerHTML        = algebre.toFixed(2);
    document.getElementById("m_analyse").innerHTML        = analyse.toFixed(2);
    document.getElementById("m_anglais").innerHTML        = anglais.toFixed(2);
    document.getElementById("m_techComm").innerHTML       = techComm.toFixed(2);
    document.getElementById("m_algo").innerHTML           = algo.toFixed(2);
    document.getElementById("m_atelier").innerHTML        = atelier.toFixed(2);
    document.getElementById("m_sysExpl").innerHTML        = sysExpl.toFixed(2);
    document.getElementById("m_sysLogique").innerHTML     = sysLogique.toFixed(2);

    // ════════════════════════════════
    // AFFICHAGE CRÉDITS MATIÈRES
    // ════════════════════════════════
    document.getElementById("cr_logique").innerHTML        = cr_logique;
    document.getElementById("cr_techMultimedia").innerHTML = cr_techMultimedia;
    document.getElementById("cr_algebre").innerHTML        = cr_algebre;
    document.getElementById("cr_analyse").innerHTML        = cr_analyse;
    document.getElementById("cr_anglais").innerHTML        = cr_anglais;
    document.getElementById("cr_techComm").innerHTML       = cr_techComm;
    document.getElementById("cr_algo").innerHTML           = cr_algo;
    document.getElementById("cr_atelier").innerHTML        = cr_atelier;
    document.getElementById("cr_sysExpl").innerHTML        = cr_sysExpl;
    document.getElementById("cr_sysLogique").innerHTML     = cr_sysLogique;

    // ════════════════════════════════
    // AFFICHAGE MOYENNES MODULES
    // ════════════════════════════════
    document.getElementById("m_logMultimedia").innerHTML = moyLogique.toFixed(2);
    document.getElementById("m_math").innerHTML          = moyMath.toFixed(2);
    document.getElementById("m_transversale").innerHTML  = moyTransversale.toFixed(2);
    document.getElementById("m_algorithmique").innerHTML = moyAlgo.toFixed(2);
    document.getElementById("m_systeme").innerHTML       = moySystème.toFixed(2);

    // ════════════════════════════════
    // AFFICHAGE CRÉDITS MODULES
    // ════════════════════════════════
    document.getElementById("cr_logMultimedia").innerHTML = cr_logMultimedia + " / " + cr_log_total;
    document.getElementById("cr_math").innerHTML          = cr_math + " / " + cr_math_total;
    document.getElementById("cr_transversale").innerHTML  = cr_transversale + " / " + cr_transversale_total;
    document.getElementById("cr_algorithmique").innerHTML = cr_algorithmique + " / " + cr_algo_total;
    document.getElementById("cr_systeme").innerHTML       = cr_systeme + " / " + cr_systeme_total;

    // ════════════════════════════════
    // COLORATION MOYENNES
    // ════════════════════════════════
    const idsMoyennes = [
        "m_logique", "m_techMultimedia", "m_algebre", "m_analyse",
        "m_anglais", "m_techComm", "m_algo", "m_atelier",
        "m_sysExpl", "m_sysLogique",
        "m_logMultimedia", "m_math", "m_transversale", "m_algorithmique", "m_systeme"
    ];
    idsMoyennes.forEach(id => colorerElement(id, parseFloat(document.getElementById(id).innerText), 10));

    // COLORATION CRÉDITS MODULES
    const creditsModules = [
        { id: "cr_logMultimedia", val: cr_logMultimedia, max: cr_log_total },
        { id: "cr_math",          val: cr_math,          max: cr_math_total },
        { id: "cr_transversale",  val: cr_transversale,  max: cr_transversale_total },
        { id: "cr_algorithmique", val: cr_algorithmique, max: cr_algo_total },
        { id: "cr_systeme",       val: cr_systeme,       max: cr_systeme_total },
    ];
    creditsModules.forEach(c => colorerElement(c.id, c.val, c.max));

    // ════════════════════════════════
    // RÉSULTAT FINAL
    // ════════════════════════════════
    let resultDiv = document.getElementById("moyenne");
    resultDiv.classList.remove("success", "fail", "show");
    resultDiv.classList.add(moyenne >= 10 ? "success" : "fail");
    resultDiv.innerHTML = `Moyenne Générale : ${moyenne.toFixed(2)} &nbsp;|&nbsp; Crédits : ${creditTotal} / ${creditMax}`;

    setTimeout(() => resultDiv.classList.add("show"), 100);
}

function validerSaisies() {
    const inputs = document.querySelectorAll("input[type='number']");
    for (let input of inputs) {
        const val = input.value.trim();
        if (val === "") continue;
        const num = parseFloat(String(val).replace(",", "."));
        if (isNaN(num) || num < 0 || num > 20) {
            input.style.border = "2px solid #dc2626";
            input.style.background = "#fee2e2";
            input.focus();
            alert(`Note invalide : "${val}"\nLa note doit être entre 0 et 20.`);
            return false;
        } else {
            input.style.border = "1.5px solid #cbd5e1";
            input.style.background = "#f9fbff";
        }
    }
    return true;
}