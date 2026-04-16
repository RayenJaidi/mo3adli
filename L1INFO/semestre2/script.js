// ─── Formules de calcul ───────────────────────────────────────────────────────

// Matière standard : TD*0.1 + DS*0.2 + Examen*0.7
function calcMatiere(td, ds, ex) {
    td = parseFloat(String(td).replace(",", ".")) || 0;
    ds = parseFloat(String(ds).replace(",", ".")) || 0;
    ex = parseFloat(String(ex).replace(",", ".")) || 0;
    return 0.1 * td + 0.2 * ds + 0.7 * ex;
}

// Matière avec TP (atelier/python/sys/réseau) : TP*0.2 + DS*0.2 + Examen*0.6
// Formule demandée : tp*0.2, ds*0.2, ex*0.6 → total 1.0
function calcMatiereTP(tp, ds, ex) {
    tp = parseFloat(String(tp).replace(",", ".")) || 0;
    ds = parseFloat(String(ds).replace(",", ".")) || 0;
    ex = parseFloat(String(ex).replace(",", ".")) || 0;
    return 0.2 * tp + 0.1 * ds + 0.7 * ex;
}

// Matière CC (unité transversale) : DS*0.2 + Examen*0.8
function calcMatiereCC(ds, ex) {
    ds = parseFloat(String(ds).replace(",", ".")) || 0;
    ex = parseFloat(String(ex).replace(",", ".")) || 0;
    return 0.2 * ds + 0.8 * ex;
}

// ─── Utilitaires crédits ─────────────────────────────────────────────────────

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

// ─── Calcul principal ─────────────────────────────────────────────────────────

function calculer() {

    if (!validerSaisies()) return;

    // ── Bases de données ──
    // Une seule matière : Fondements des bases de données (coef 2)
    let bdd = calcMatiere(
        document.getElementById("bdd_td").value,
        document.getElementById("bdd_ds").value,
        document.getElementById("bdd_ex").value
    );
    let moyBaseDonnees    = bdd;
    let cr_bdd            = creditMatiere(bdd, 2);
    let cr_bdd_total      = getCredit(2); // 4
    let cr_baseDonnees    = creditModule(moyBaseDonnees, cr_bdd_total, cr_bdd);

    // ── Mathématiques 2 ──
    let algebre2 = calcMatiere(
        document.getElementById("alg2_td").value,
        document.getElementById("alg2_ds").value,
        document.getElementById("alg2_ex").value
    );
    let analyse2 = calcMatiere(
        document.getElementById("ana2_td").value,
        document.getElementById("ana2_ds").value,
        document.getElementById("ana2_ex").value
    );
    let moyMath2       = (algebre2 * 1.5 + analyse2 * 1.5) / 3;
    let cr_algebre2    = creditMatiere(algebre2, 1.5);
    let cr_analyse2    = creditMatiere(analyse2, 1.5);
    let cr_math2_total = getCredit(1.5) + getCredit(1.5); // 6
    let cr_math2       = creditModule(moyMath2, cr_math2_total, cr_algebre2 + cr_analyse2);

    // ── Algorithmique et programmation 2 ──
    // algo2 : TD*0.1 + DS*0.2 + Ex*0.7
    let algo2 = calcMatiere(
        document.getElementById("algo2_td").value,
        document.getElementById("algo2_ds").value,
        document.getElementById("algo2_ex").value
    );
    // atelier2 : TP*0.2 + DS*0.2 + Ex*0.6
    let atelier2 = calcMatiereTP(
        document.getElementById("atelier2_tp").value,
        document.getElementById("atelier2_ds").value,
        document.getElementById("atelier2_ex").value
    );
    // python : TP*0.2 + DS*0.2 + Ex*0.6
    let python = calcMatiereTP(
        document.getElementById("python_tp").value,
        document.getElementById("python_ds").value,
        document.getElementById("python_ex").value
    );
    let moyAlgo2          = (algo2 * 1.5 + atelier2 * 1 + python * 1) / 3.5;
    let cr_algo2          = creditMatiere(algo2, 1.5);
    let cr_atelier2       = creditMatiere(atelier2, 1);
    let cr_python         = creditMatiere(python, 1);
    let cr_algo2_total    = getCredit(1.5) + getCredit(1) + getCredit(1); // 7
    let cr_algorithmique2 = creditModule(moyAlgo2, cr_algo2_total, cr_algo2 + cr_atelier2 + cr_python);

    // ── Systèmes d'exploitation et réseaux ──
    // sys2 : TP*0.2 + DS*0.2 + Ex*0.6
    let sys2 = calcMatiereTP(
        document.getElementById("sys2_tp").value,
        document.getElementById("sys2_ds").value,
        document.getElementById("sys2_ex").value
    );
    // reseau : TP*0.2 + DS*0.2 + Ex*0.6
    let reseau = calcMatiereTP(
        document.getElementById("reseau_tp").value,
        document.getElementById("reseau_ds").value,
        document.getElementById("reseau_ex").value
    );
    let moySysteme2       = (sys2 * 1.5 + reseau * 2) / 3.5;
    let cr_sys2           = creditMatiere(sys2, 1.5);
    let cr_reseau         = creditMatiere(reseau, 2);
    let cr_systeme2_total = getCredit(1.5) + getCredit(2); // 7
    let cr_systeme2       = creditModule(moySysteme2, cr_systeme2_total, cr_sys2 + cr_reseau);

    // ── Unité transversale (CC) ──
    let anglais2  = calcMatiereCC(document.getElementById("ang2_ds").value,      document.getElementById("ang2_ex").value);
    let techComm2 = calcMatiereCC(document.getElementById("techcomm2_ds").value, document.getElementById("techcomm2_ex").value);
    let culture   = calcMatiereCC(document.getElementById("culture_ds").value,   document.getElementById("culture_ex").value);
    let moyTransversale2       = (anglais2 * 1 + techComm2 * 1 + culture * 1) / 3;
    let cr_anglais2            = creditMatiere(anglais2, 1);
    let cr_techComm2           = creditMatiere(techComm2, 1);
    let cr_culture             = creditMatiere(culture, 1);
    let cr_transversale2_total = getCredit(1) + getCredit(1) + getCredit(1); // 6
    let cr_transversale2       = creditModule(moyTransversale2, cr_transversale2_total, cr_anglais2 + cr_techComm2 + cr_culture);

    // ── Moyenne générale ──
    // Coefficients modules : BDD=2, Math2=3, Algo2=3.5, Sys2=3.5, Transversale=3  → total = 15
    let moyenne = (
        moyBaseDonnees   * 2   +
        moyMath2         * 3   +
        moyAlgo2         * 3.5 +
        moySysteme2      * 3.5 +
        moyTransversale2 * 3
    ) / 15;

    // ── Crédit total ──
    let creditTotal = cr_baseDonnees + cr_math2 + cr_algorithmique2 + cr_systeme2 + cr_transversale2;
    let creditMax   = cr_bdd_total + cr_math2_total + cr_algo2_total + cr_systeme2_total + cr_transversale2_total;

    // ════════════════════════════════
    // AFFICHAGE MOYENNES MATIÈRES
    // ════════════════════════════════
    document.getElementById("m_bdd").innerHTML        = bdd.toFixed(2);
    document.getElementById("m_algebre2").innerHTML   = algebre2.toFixed(2);
    document.getElementById("m_analyse2").innerHTML   = analyse2.toFixed(2);
    document.getElementById("m_algo2").innerHTML      = algo2.toFixed(2);
    document.getElementById("m_atelier2").innerHTML   = atelier2.toFixed(2);
    document.getElementById("m_python").innerHTML     = python.toFixed(2);
    document.getElementById("m_sys2").innerHTML       = sys2.toFixed(2);
    document.getElementById("m_reseau").innerHTML     = reseau.toFixed(2);
    document.getElementById("m_anglais2").innerHTML   = anglais2.toFixed(2);
    document.getElementById("m_techComm2").innerHTML  = techComm2.toFixed(2);
    document.getElementById("m_culture").innerHTML    = culture.toFixed(2);

    // ════════════════════════════════
    // AFFICHAGE CRÉDITS MATIÈRES
    // ════════════════════════════════
    document.getElementById("cr_bdd").innerHTML        = cr_bdd;
    document.getElementById("cr_algebre2").innerHTML   = cr_algebre2;
    document.getElementById("cr_analyse2").innerHTML   = cr_analyse2;
    document.getElementById("cr_algo2").innerHTML      = cr_algo2;
    document.getElementById("cr_atelier2").innerHTML   = cr_atelier2;
    document.getElementById("cr_python").innerHTML     = cr_python;
    document.getElementById("cr_sys2").innerHTML       = cr_sys2;
    document.getElementById("cr_reseau").innerHTML     = cr_reseau;
    document.getElementById("cr_anglais2").innerHTML   = cr_anglais2;
    document.getElementById("cr_techComm2").innerHTML  = cr_techComm2;
    document.getElementById("cr_culture").innerHTML    = cr_culture;

    // ════════════════════════════════
    // AFFICHAGE MOYENNES MODULES
    // ════════════════════════════════
    document.getElementById("m_baseDonnees").innerHTML   = moyBaseDonnees.toFixed(2);
    document.getElementById("m_math2").innerHTML         = moyMath2.toFixed(2);
    document.getElementById("m_algorithmique2").innerHTML= moyAlgo2.toFixed(2);
    document.getElementById("m_systeme2").innerHTML      = moySysteme2.toFixed(2);
    document.getElementById("m_transversale2").innerHTML = moyTransversale2.toFixed(2);

    // ════════════════════════════════
    // AFFICHAGE CRÉDITS MODULES
    // ════════════════════════════════
    document.getElementById("cr_baseDonnees").innerHTML   = cr_baseDonnees   + " / " + cr_bdd_total;
    document.getElementById("cr_math2").innerHTML         = cr_math2         + " / " + cr_math2_total;
    document.getElementById("cr_algorithmique2").innerHTML= cr_algorithmique2 + " / " + cr_algo2_total;
    document.getElementById("cr_systeme2").innerHTML      = cr_systeme2      + " / " + cr_systeme2_total;
    document.getElementById("cr_transversale2").innerHTML = cr_transversale2 + " / " + cr_transversale2_total;

    // ════════════════════════════════
    // COLORATION MOYENNES
    // ════════════════════════════════
    const idsMoyennes = [
        "m_bdd",
        "m_algebre2", "m_analyse2",
        "m_algo2", "m_atelier2", "m_python",
        "m_sys2", "m_reseau",
        "m_anglais2", "m_techComm2", "m_culture",
        "m_baseDonnees", "m_math2", "m_algorithmique2", "m_systeme2", "m_transversale2"
    ];
    idsMoyennes.forEach(id => colorerElement(id, parseFloat(document.getElementById(id).innerText), 10));

    // COLORATION CRÉDITS MODULES
    const creditsModules = [
        { id: "cr_baseDonnees",    val: cr_baseDonnees,    max: cr_bdd_total },
        { id: "cr_math2",          val: cr_math2,          max: cr_math2_total },
        { id: "cr_algorithmique2", val: cr_algorithmique2, max: cr_algo2_total },
        { id: "cr_systeme2",       val: cr_systeme2,       max: cr_systeme2_total },
        { id: "cr_transversale2",  val: cr_transversale2,  max: cr_transversale2_total },
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

// ─── Validation des saisies ───────────────────────────────────────────────────

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