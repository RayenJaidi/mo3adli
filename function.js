function calcMatiere(td, ds, ex) {
    td = parseFloat(String(td).replace(",", ".")) || 0;
    ds = parseFloat(String(ds).replace(",", ".")) || 0;
    ex = parseFloat(String(ex).replace(",", ".")) || 0;
    return 0.1 * td + 0.2 * ds + 0.7 * ex;
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

function validerSaisies() {
    const inputs = document.querySelectorAll("input[type='number']");
    for (let input of inputs) {
        const val = input.value.trim();
        if (val === "") continue;
        const num = parseFloat(String(val).replace(",", "."));
        if (isNaN(num) || num < 0 || num > 20) {
            input.classList.add("invalid");
            input.classList.remove("valid");
            input.focus();
            alert(`Note invalide : "${val}"\nLa note doit être entre 0 et 20.`);
            return false;
        } else {
            input.classList.add("valid");
            input.classList.remove("invalid");
        }
    }
    return true;
}

function calculer() {

    if (!validerSaisies()) return;

    // ── CPOO ──
    let si = calcMatiere(
        document.getElementById("si_td").value,
        document.getElementById("si_ds").value,
        document.getElementById("si_ex").value
    );
    let java = calcMatiere(
        document.getElementById("java_ds").value,
        document.getElementById("java_td").value,
        document.getElementById("java_ex").value
    );
    let moyCoop = (si * 1.5 + java * 2) / 3.5;

    let cr_si         = creditMatiere(si, 1.5);
    let cr_java       = creditMatiere(java, 2);
    let cr_cpoo_total = getCredit(1.5) + getCredit(2); // 7
    let cr_cpoo       = creditModule(moyCoop, cr_cpoo_total, cr_si + cr_java);

    // ── Probabilité ──
    let proba = calcMatiere(
        document.getElementById("proba_td").value,
        document.getElementById("proba_ds").value,
        document.getElementById("proba_ex").value
    );
    let moyProba = proba;

    let cr_proba       = creditMatiere(proba, 2);
    let cr_proba_total = getCredit(2); // 4
    let cr_probabilite = creditModule(moyProba, cr_proba_total, cr_proba);

    // ── Automate ──
    let tla = calcMatiere(
        document.getElementById("tla_td").value,
        document.getElementById("tla_ds").value,
        document.getElementById("tla_ex").value
    );
    let graph = calcMatiere(
        document.getElementById("graph_td").value,
        document.getElementById("graph_ds").value,
        document.getElementById("graph_ex").value
    );
    let moyAutomate = (tla + graph) / 2;

    let cr_tla        = creditMatiere(tla, 1);
    let cr_graph      = creditMatiere(graph, 1);
    let cr_auto_total = getCredit(1) + getCredit(1); // 4
    let cr_automate   = creditModule(moyAutomate, cr_auto_total, cr_tla + cr_graph);

    // ── Base de données ──
    let bd = calcMatiere(
        document.getElementById("bd_ds").value,
        document.getElementById("bd_td").value,
        document.getElementById("bd_ex").value
    );
    let reseau = calcMatiere(
        document.getElementById("res_ds").value,
        document.getElementById("res_td").value,
        document.getElementById("res_ex").value
    );
    let moyBase = (reseau + bd * 1.5) / 2.5;

    let cr_bd         = creditMatiere(bd, 1.5);
    let cr_reseau     = creditMatiere(reseau, 1);
    let cr_base_total = getCredit(1.5) + getCredit(1); // 5
    let cr_base       = creditModule(moyBase, cr_base_total, cr_bd + cr_reseau);

    // ── Langue et culture ──
    let ang     = parseFloat(String(document.getElementById("ang_ds").value).replace(",", ".")) * 0.2
                + parseFloat(String(document.getElementById("ang_ex").value).replace(",", ".")) * 0.8;
    let gestion = parseFloat(String(document.getElementById("gest_ds").value).replace(",", ".")) * 0.2
                + parseFloat(String(document.getElementById("gest_ex").value).replace(",", ".")) * 0.8;
    ang     = ang     || 0;
    gestion = gestion || 0;
    let moyLangue = (ang + gestion) / 2;

    let cr_ang          = creditMatiere(ang, 1);
    let cr_gestion      = creditMatiere(gestion, 1);
    let cr_langue_total = getCredit(1) + getCredit(1); // 4
    let cr_langue       = creditModule(moyLangue, cr_langue_total, cr_ang + cr_gestion);

    // ── UE Optionnelle ──
    let ent = calcMatiere(
        document.getElementById("ent_ds").value,
        document.getElementById("ent_td").value,
        document.getElementById("ent_ex").value
    );
    let sys = calcMatiere(
        document.getElementById("sys_ds").value,
        document.getElementById("sys_td").value,
        document.getElementById("sys_ex").value
    );
    let moyUO = (ent * 1.5 + sys * 1.5) / 3;

    let cr_ent      = creditMatiere(ent, 1.5);
    let cr_sys      = creditMatiere(sys, 1.5);
    let cr_uo_total = getCredit(1.5) + getCredit(1.5); // 6
    let cr_uo       = creditModule(moyUO, cr_uo_total, cr_ent + cr_sys);

    // ── Moyenne générale ──
    let moyenne = (moyCoop * 3.5 + moyProba * 2 + moyAutomate * 2 + moyBase * 2.5 + moyLangue * 2 + moyUO * 3) / 15;

    // ── Crédit total ──
    let creditTotal = cr_cpoo + cr_probabilite + cr_automate + cr_base + cr_langue + cr_uo;
    let creditMax   = cr_cpoo_total + cr_proba_total + cr_auto_total + cr_base_total + cr_langue_total + cr_uo_total;

    // ════════════════════════════════
    // AFFICHAGE MOYENNES MATIÈRES
    // ════════════════════════════════
    document.getElementById("m_si").innerHTML      = si.toFixed(2);
    document.getElementById("m_java").innerHTML    = java.toFixed(2);
    document.getElementById("m_proba").innerHTML   = proba.toFixed(2);
    document.getElementById("m_tla").innerHTML     = tla.toFixed(2);
    document.getElementById("m_graphe").innerHTML  = graph.toFixed(2);
    document.getElementById("m_base").innerHTML    = bd.toFixed(2);
    document.getElementById("m_reseau").innerHTML  = reseau.toFixed(2);
    document.getElementById("m_ang").innerHTML     = ang.toFixed(2);
    document.getElementById("m_gestion").innerHTML = gestion.toFixed(2);
    document.getElementById("m_ent").innerHTML     = ent.toFixed(2);
    document.getElementById("m_sys").innerHTML     = sys.toFixed(2);

    // ════════════════════════════════
    // AFFICHAGE CRÉDITS MATIÈRES
    // ════════════════════════════════
    document.getElementById("cr_si").innerHTML      = cr_si;
    document.getElementById("cr_java").innerHTML    = cr_java;
    document.getElementById("cr_proba").innerHTML   = cr_proba;
    document.getElementById("cr_tla").innerHTML     = cr_tla;
    document.getElementById("cr_graph").innerHTML   = cr_graph;
    document.getElementById("cr_bd").innerHTML      = cr_bd;
    document.getElementById("cr_reseau").innerHTML  = cr_reseau;
    document.getElementById("cr_ang").innerHTML     = cr_ang;
    document.getElementById("cr_gestion").innerHTML = cr_gestion;
    document.getElementById("cr_ent").innerHTML     = cr_ent;
    document.getElementById("cr_sys").innerHTML     = cr_sys;

    // ════════════════════════════════
    // AFFICHAGE MOYENNES MODULES
    // ════════════════════════════════
    document.getElementById("m_cpoo").innerHTML        = moyCoop.toFixed(2);
    document.getElementById("m_probabilité").innerHTML = moyProba.toFixed(2);
    document.getElementById("m_automate").innerHTML    = moyAutomate.toFixed(2);
    document.getElementById("m_basededonne").innerHTML = moyBase.toFixed(2);
    document.getElementById("m_langue").innerHTML      = moyLangue.toFixed(2);
    document.getElementById("m_uo").innerHTML          = moyUO.toFixed(2);

    // ════════════════════════════════
    // AFFICHAGE CRÉDITS MODULES
    // ════════════════════════════════
    document.getElementById("cr_cpoo").innerHTML        = cr_cpoo + " / " + cr_cpoo_total;
    document.getElementById("cr_probabilite").innerHTML = cr_probabilite + " / " + cr_proba_total;
    document.getElementById("cr_automate").innerHTML    = cr_automate + " / " + cr_auto_total;
    document.getElementById("cr_basededonne").innerHTML = cr_base + " / " + cr_base_total;
    document.getElementById("cr_langue").innerHTML      = cr_langue + " / " + cr_langue_total;
    document.getElementById("cr_uo").innerHTML          = cr_uo + " / " + cr_uo_total;

    // ════════════════════════════════
    // COLORATION MOYENNES
    // ════════════════════════════════
    const idsMoyennes = [
        "m_si", "m_java", "m_proba", "m_tla", "m_graphe",
        "m_base", "m_reseau", "m_ang", "m_gestion", "m_ent", "m_sys",
        "m_cpoo", "m_probabilité", "m_automate", "m_basededonne", "m_langue", "m_uo"
    ];
    idsMoyennes.forEach(id => colorerElement(id, parseFloat(document.getElementById(id).innerText), 10));

    // COLORATION CRÉDITS MODULES
    const creditsModules = [
        { id: "cr_cpoo",        val: cr_cpoo,        max: cr_cpoo_total },
        { id: "cr_probabilite", val: cr_probabilite, max: cr_proba_total },
        { id: "cr_automate",    val: cr_automate,    max: cr_auto_total },
        { id: "cr_basededonne", val: cr_base,        max: cr_base_total },
        { id: "cr_langue",      val: cr_langue,      max: cr_langue_total },
        { id: "cr_uo",          val: cr_uo,          max: cr_uo_total },
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