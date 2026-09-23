import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { Sparkles, Check, Plus, Send, CheckCircle2, FileText, Download, Pencil, Eye, PackagePlus, Ban, Truck, Factory } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { SectionCard, StatusBadge, head } from "@/components/app/shared";
import { DataTable, type DataColumn } from "@/components/app/data-table";
import { requests as seedRequests, quotes as seedQuotes, orders as seedOrders, quoteScenarios, productCatalog } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import logoAsset from "@/assets/logo-la-globale-marocaine.png.asset.json";

export const Route = createFileRoute("/devis-commandes")({
  head: () => head("Devis & Commandes", "Workflow complet : demande client, devis, validation et commande."),
  component: Page,
});

type Any = any;

const quoteTone = (s: string) => s === "Validé" ? "success" : s === "Refusé" || s === "Expiré" ? "danger" : s === "En attente" || s === "En validation" ? "warning" : s === "Envoyé au client" ? "info" : "neutral";
const orderTone = (s: string) => s === "Livrée" || s === "Confirmée" ? "success" : s === "Annulée" ? "danger" : s === "À valider" || s === "Nouvelle" ? "warning" : "info";
const reqTone = (s: string) => s === "Traitée" ? "success" : s === "Nouvelle" ? "warning" : s === "Devis envoyé" ? "info" : "ai";
const money = (n: number) => `${Math.round(n).toLocaleString("fr-FR")} DH`;

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <div className="min-w-0"><p className="text-[10px] font-semibold uppercase text-muted-foreground">{label}</p><p className="mt-0.5 break-words text-xs font-semibold">{children}</p></div>;
}

function Stepper({ step }: { step: number }) {
  const steps = ["Demande reçue", "Devis préparé", "Validation client", "Commande"];
  return (
    <div className="rounded-md border bg-panel p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <span className={`grid size-7 shrink-0 place-items-center rounded-full border text-[11px] font-bold ${i < step ? "border-primary bg-primary text-primary-foreground" : i === step ? "border-primary bg-secondary text-primary" : "border-border bg-muted text-muted-foreground"}`}>{i < step ? <Check className="size-3.5" /> : i === step ? "●" : "○"}</span>
            <span className={`text-[11px] font-semibold ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
            {i < steps.length - 1 && <span className={`hidden h-px flex-1 sm:block ${i < step ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function QuotePreview({ q }: { q: Any }) {
  return (
    <div className="rounded-md border bg-card p-5 text-xs">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logoAsset.url} alt="La Globale Marocaine" className="h-11 w-11 object-contain" />
          <div><b className="text-sm">LA GLOBALE MAROCAINE</b><p className="text-[10px] text-muted-foreground">Emballages plastiques industriels</p></div>
        </div>
        <div className="text-right"><h3 className="text-base font-extrabold">DEVIS</h3><p className="font-mono text-[11px] text-primary">{q.id}</p><StatusBadge tone={quoteTone(q.status) as any}>{q.status}</StatusBadge></div>
      </div>
      <div className="my-4 grid grid-cols-2 gap-3 border-y py-3 sm:grid-cols-4">
        <Field label="Client">{q.client}</Field>
        <Field label="Demande associée">{q.requestId}</Field>
        <Field label="Date">{q.date}</Field>
        <Field label="Validité">{q.validity}</Field>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead><tr className="bg-muted/60 text-[10px] uppercase text-muted-foreground"><th className="p-2">Produit</th><th className="p-2">Quantité</th><th className="p-2">Prix unitaire</th><th className="p-2">Remise</th><th className="p-2">Total HT</th></tr></thead>
          <tbody><tr className="border-b"><td className="p-2">{q.product}</td><td className="p-2">{q.qty.toLocaleString("fr-FR")}</td><td className="p-2">{q.unitPrice.toFixed(2)} DH</td><td className="p-2">{q.discount}%</td><td className="p-2 font-bold">{money(q.totalHt)}</td></tr></tbody>
        </table>
      </div>
      <div className="ml-auto mt-4 w-full max-w-xs space-y-1">
        <p className="flex justify-between"><span>Total HT</span><b>{money(q.totalHt)}</b></p>
        <p className="flex justify-between"><span>TVA {q.tva}%</span><b>{money(q.totalHt * q.tva / 100)}</b></p>
        <p className="flex justify-between border-t pt-1 text-sm"><span>Total TTC</span><b>{money(q.total)}</b></p>
      </div>
      <div className="mt-4 grid gap-3 border-t pt-3 sm:grid-cols-3">
        <Field label="Délai de livraison">{q.delay}</Field>
        <Field label="Conditions de paiement">{q.payment}</Field>
        <Field label="Conditions commerciales">{q.conditions}</Field>
      </div>
    </div>
  );
}

function Page() {
  const [reqs, setReqs] = useState<Any[]>(seedRequests as Any[]);
  const [qs, setQs] = useState<Any[]>(seedQuotes as Any[]);
  const [ords, setOrds] = useState<Any[]>(seedOrders as Any[]);
  const [openReq, setOpenReq] = useState<string | null>(null);
  const [openQuote, setOpenQuote] = useState<string | null>(null);
  const [openOrder, setOpenOrder] = useState<string | null>(null);
  const [picked, setPicked] = useState<Record<string, Any>>({});
  const [custom, setCustom] = useState<Record<string, Any[]>>({});
  const [scenarioForm, setScenarioForm] = useState<string | null>(null);
  const [orderForm, setOrderForm] = useState<Any | null>(null);
  const [generating, setGenerating] = useState(false);

  const req = reqs.find(r => r.id === openReq);
  const reqQuote = useMemo(() => qs.find(q => q.requestId === openReq), [qs, openReq]);
  const reqOrder = useMemo(() => ords.find(o => reqQuote && o.quoteId === reqQuote.id), [ords, reqQuote]);

  const patchQuote = (id: string, p: Any) => setQs(v => v.map(q => q.id === id ? { ...q, ...p } : q));
  const patchReq = (id: string, p: Any) => setReqs(v => v.map(r => r.id === id ? { ...r, ...p } : r));
  const patchOrder = (id: string, p: Any) => setOrds(v => v.map(o => o.id === id ? { ...o, ...p } : o));

  const createQuote = () => {
    if (!req) return;
    const s = picked[req.id]; if (!s) return;
    setGenerating(true); toast.loading("Préparation du devis...", { id: "gen" });
    setTimeout(() => {
      const totalHt = Math.round(s.unitPrice * s.qty * (1 - (s.discount ?? 0) / 100));
      const id = `DEV-2026-${String(qs.length + 1).padStart(3, "0")}`;
      setQs(v => [{ id, requestId: req.id, client: req.company, contact: req.client, product: s.product, ref: req.ref, qty: s.qty, unitPrice: s.unitPrice, discount: s.discount ?? 0, tva: s.tva ?? 20, totalHt, total: Math.round(totalHt * 1.2), date: "23/09/2026", validity: s.validity, validUntil: "23/10/2026", delay: s.delay, payment: s.payment, conditions: s.conditions, status: "Brouillon", source: req.source, rep: "Admin", scenario: s.label }, ...v]);
      patchReq(req.id, { status: "Devis en préparation" });
      setGenerating(false); toast.success(`Devis ${id} généré avec succès`, { id: "gen" });
    }, 1100);
  };

  const sendQuote = (q: Any) => {
    patchQuote(q.id, { status: "Envoyé au client" });
    patchReq(q.requestId, { status: "Devis envoyé" });
    toast.success(`${q.id} envoyé au client ${q.client}`);
    setTimeout(() => patchQuote(q.id, { status: "En attente" }), 1400);
  };

  const confirmOrder = () => {
    if (!orderForm) return;
    const id = `CMD-2026-${String(ords.length + 21).padStart(3, "0")}`;
    setOrds(v => [{ ...orderForm, id, status: "Nouvelle" }, ...v]);
    patchQuote(orderForm.quoteId, { status: "Validé" });
    patchReq(orderForm.requestId, { status: "Traitée" });
    toast.success(`Commande ${id} créée avec succès à partir du devis ${orderForm.quoteId}.`);
    setOrderForm(null);
  };

  const step = !reqQuote ? 0 : reqOrder ? 4 : reqQuote.status === "Validé" ? 3 : ["En attente", "Envoyé au client"].includes(reqQuote.status) ? 2 : 1;

  // ---------- tables ----------
  const reqCols: DataColumn<Any>[] = [
    { key: "id", label: "ID demande", value: r => r.id, className: "font-mono font-bold text-primary" },
    { key: "client", label: "Client", value: r => r.client },
    { key: "company", label: "Entreprise", value: r => r.company, className: "font-semibold" },
    { key: "product", label: "Produit", value: r => r.product },
    { key: "qty", label: "Quantité", value: r => r.qty, render: r => r.qty.toLocaleString("fr-FR") },
    { key: "date", label: "Date", value: r => r.date },
    { key: "source", label: "Source", value: r => r.source },
    { key: "status", label: "Statut", value: r => r.status, render: r => <StatusBadge tone={reqTone(r.status) as any}>{r.status}</StatusBadge> },
  ];
  const quoteCols: DataColumn<Any>[] = [
    { key: "id", label: "N° devis", value: q => q.id, className: "font-mono font-bold text-primary" },
    { key: "client", label: "Client", value: q => q.client, className: "font-semibold" },
    { key: "requestId", label: "Demande associée", value: q => q.requestId, className: "font-mono" },
    { key: "product", label: "Produit", value: q => q.product },
    { key: "total", label: "Montant", value: q => q.total, render: q => money(q.total) },
    { key: "date", label: "Date", value: q => q.date },
    { key: "validUntil", label: "Validité", value: q => q.validUntil },
    { key: "status", label: "Statut", value: q => q.status, render: q => <StatusBadge tone={quoteTone(q.status) as any}>{q.status}</StatusBadge> },
  ];
  const orderCols: DataColumn<Any>[] = [
    { key: "id", label: "N° commande", value: o => o.id, className: "font-mono font-bold text-primary" },
    { key: "quoteId", label: "Devis associé", value: o => o.quoteId, className: "font-mono" },
    { key: "client", label: "Client", value: o => o.client, className: "font-semibold" },
    { key: "product", label: "Produit", value: o => o.product },
    { key: "qty", label: "Quantité", value: o => o.qty, render: o => o.qty.toLocaleString("fr-FR") },
    { key: "amount", label: "Montant", value: o => o.amount, render: o => money(o.amount) },
    { key: "date", label: "Date", value: o => o.date },
    { key: "delivery", label: "Livraison prévue", value: o => o.delivery },
    { key: "status", label: "Statut", value: o => o.status, render: o => <StatusBadge tone={orderTone(o.status) as any}>{o.status}</StatusBadge> },
  ];

  const quote = qs.find(q => q.id === openQuote);
  const order = ords.find(o => o.id === openOrder);
  const scenarios = req ? [...quoteScenarios(req), ...(custom[req.id] ?? [])] : [];

  return (
    <AppShell title="Devis & Commandes" subtitle="Demande client → Devis → Validation du devis → Commande.">
      <div className="mb-5 flex flex-wrap items-center gap-2 rounded-md border border-ai/25 bg-accent/40 px-4 py-3 text-xs">
        <Sparkles className="size-4 text-ai" /><b>Workflow :</b> Demande client <span>→</span> Devis <span>→</span> Validation du devis <span>→</span> Commande
      </div>

      <Tabs defaultValue="demandes">
        <TabsList className="mb-5"><TabsTrigger value="demandes">Demandes</TabsTrigger><TabsTrigger value="devis">Devis</TabsTrigger><TabsTrigger value="commandes">Commandes</TabsTrigger></TabsList>

        <TabsContent value="demandes">
          <SectionCard title="Demandes clients">
            <DataTable data={reqs} columns={reqCols} searchPlaceholder="Demande, client, entreprise ou produit..."
              filters={[
                { key: "date", label: "Date", options: [...new Set(reqs.map(r => r.date))], value: r => r.date },
                { key: "company", label: "Client", options: [...new Set(reqs.map(r => r.company))], value: r => r.company },
                { key: "product", label: "Produit", options: [...new Set(reqs.map(r => r.product))], value: r => r.product },
                { key: "source", label: "Source", options: [...new Set(reqs.map(r => r.source))], value: r => r.source },
                { key: "status", label: "Statut", options: [...new Set(reqs.map(r => r.status))], value: r => r.status },
              ]}
              onView={r => setOpenReq(r.id)}
              onEdit={r => { setOpenReq(r.id); toast.success(`${r.id} ouvert en modification`); }}
              onDuplicate={r => { patchReq(r.id, { status: "En analyse" }); toast.success(`${r.id} : traitement de la demande lancé`); }}
            />
          </SectionCard>
        </TabsContent>

        <TabsContent value="devis">
          <SectionCard title="Tous les devis">
            <DataTable data={qs} columns={quoteCols} searchPlaceholder="Devis, client ou demande associée..."
              filters={[
                { key: "date", label: "Date", options: [...new Set(qs.map(q => q.date))], value: q => q.date },
                { key: "client", label: "Client", options: [...new Set(qs.map(q => q.client))], value: q => q.client },
                { key: "status", label: "Statut", options: [...new Set(qs.map(q => q.status))], value: q => q.status },
                { key: "amount", label: "Montant", options: ["< 25 000 DH", "25 000 – 60 000 DH", "> 60 000 DH"], value: q => q.total < 25000 ? "< 25 000 DH" : q.total <= 60000 ? "25 000 – 60 000 DH" : "> 60 000 DH" },
              ]}
              onView={q => setOpenQuote(q.id)}
              onEdit={q => toast.success(`${q.id} ouvert en modification`)}
              onDuplicate={q => { setQs(v => [{ ...q, id: `DEV-2026-${String(v.length + 1).padStart(3, "0")}`, status: "Brouillon" }, ...v]); toast.success(`${q.id} dupliqué`); }}
              onDelete={q => { patchQuote(q.id, { status: "Refusé" }); toast.success(`${q.id} annulé`); }}
            />
          </SectionCard>
        </TabsContent>

        <TabsContent value="commandes">
          <SectionCard title="Commandes clients">
            <DataTable data={ords} columns={orderCols} searchPlaceholder="Commande, devis, client ou produit..."
              filters={[
                { key: "date", label: "Date", options: [...new Set(ords.map(o => o.date))], value: o => o.date },
                { key: "client", label: "Client", options: [...new Set(ords.map(o => o.client))], value: o => o.client },
                { key: "product", label: "Produit", options: [...new Set(ords.map(o => o.product))], value: o => o.product },
                { key: "status", label: "Statut", options: [...new Set(ords.map(o => o.status))], value: o => o.status },
              ]}
              onView={o => setOpenOrder(o.id)}
              onEdit={o => toast.success(`${o.id} ouvert en modification`)}
              onDuplicate={o => toast.success(`Client ${o.client} contacté au sujet de ${o.id}`)}
              onDelete={o => { patchOrder(o.id, { status: "Annulée" }); toast.success(`${o.id} annulée`); }}
            />
          </SectionCard>
        </TabsContent>
      </Tabs>

      {/* -------- panneau demande -------- */}
      <Sheet open={!!openReq} onOpenChange={o => !o && setOpenReq(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-[50vw]">
          {req && <>
            <SheetHeader><SheetTitle className="flex flex-wrap items-center gap-2"><span className="font-mono text-primary">{req.id}</span><StatusBadge tone={reqTone(req.status) as any}>{req.status}</StatusBadge></SheetTitle></SheetHeader>
            <div className="space-y-5 py-4">
              <Stepper step={step} />

              <div className="rounded-md border bg-card p-4">
                <p className="mb-3 text-xs font-extrabold">Informations de la demande</p>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  <Field label="Date">{req.date}</Field><Field label="Client">{req.client}</Field><Field label="Entreprise">{req.company}</Field>
                  <Field label="Email">{req.email}</Field><Field label="Téléphone">{req.phone}</Field><Field label="Source">{req.source}</Field>
                  <Field label="Produit">{req.product}</Field><Field label="Référence">{req.ref}</Field><Field label="Quantité">{req.qty.toLocaleString("fr-FR")}</Field>
                  <Field label="Dimensions">{req.dimensions}</Field><Field label="Matière">{req.material}</Field><Field label="Personnalisation">{req.customization}</Field>
                  <Field label="Date de livraison souhaitée">{req.desired}</Field>
                  <Field label="Pièces jointes">{req.attachments.length ? req.attachments.join(", ") : "Aucune"}</Field>
                </div>
                <div className="mt-3 space-y-2 border-t pt-3">
                  <Field label="Message du client">{req.message}</Field>
                  <Field label="Notes internes">{req.notes}</Field>
                </div>
              </div>

              {!reqQuote && <div className="rounded-md border bg-card p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-extrabold">Scénarios de devis</p>
                  <Button size="sm" variant="outline" onClick={() => setScenarioForm(req.id)}><Plus />Créer un scénario</Button>
                </div>
                <div className="space-y-3">
                  {scenarios.map(s => {
                    const sel = picked[req.id]?.id === s.id;
                    return <div key={s.id} className={`rounded-md border p-4 transition ${sel ? "border-primary bg-success-soft/40" : "bg-panel hover:border-primary/40"}`}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <b className="text-xs">{s.label}</b>
                        {sel ? <StatusBadge tone="success">Sélectionné</StatusBadge> : s.recommended ? <StatusBadge tone="ai">Recommandé par l’IA</StatusBadge> : <StatusBadge tone="neutral">{s.similarity}% similaire</StatusBadge>}
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <Field label="Produit">{s.product}</Field><Field label="Quantité">{s.qty.toLocaleString("fr-FR")}</Field>
                        <Field label="Prix unitaire">{s.unitPrice.toFixed(2)} DH</Field><Field label="Prix total">{money(s.total)}</Field>
                        <Field label="Délai">{s.delay}</Field><Field label="Conditions">{s.payment}</Field>
                        <Field label="Marge estimée">{s.margin}%</Field><Field label="Similarité">{s.similarity}%</Field>
                      </div>
                      <p className="mt-3 text-[11px] text-muted-foreground">{s.reason}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button size="sm" variant="ghost" onClick={() => toast.success(`${s.label} — ${money(s.total)} · ${s.delay}`)}><Eye />Voir détails</Button>
                        <Button size="sm" variant={sel ? "secondary" : "default"} onClick={() => { setPicked(v => ({ ...v, [req.id]: s })); toast.success(`${s.label} sélectionné`); }}><Check />Choisir ce scénario</Button>
                      </div>
                    </div>;
                  })}
                </div>
                {picked[req.id] && <div className="mt-4 rounded-md border border-primary bg-success-soft/40 p-4">
                  <p className="text-xs font-extrabold text-primary">Scénario sélectionné · {picked[req.id].label}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{picked[req.id].qty.toLocaleString("fr-FR")} × {picked[req.id].unitPrice.toFixed(2)} DH — {money(picked[req.id].total)} · {picked[req.id].delay}</p>
                  <Button className="mt-3" disabled={generating} onClick={createQuote}><FileText />{generating ? "Préparation du devis..." : "Créer le devis"}</Button>
                </div>}
              </div>}

              {reqQuote && <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2"><p className="text-xs font-extrabold">Devis {reqQuote.id}</p><StatusBadge tone={quoteTone(reqQuote.status) as any}>{reqQuote.status}</StatusBadge></div>
                <QuotePreview q={reqQuote} />
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => toast.success(`${reqQuote.id} ouvert en modification`)}><Pencil />Modifier</Button>
                  <Button size="sm" variant="outline" onClick={() => toast.success("Prévisualisation PDF générée")}><Eye />Prévisualiser</Button>
                  <Button size="sm" variant="outline" onClick={() => toast.success("PDF téléchargé")}><Download />PDF</Button>
                  <Button size="sm" variant="outline" disabled={reqQuote.status !== "Brouillon"} onClick={() => { patchQuote(reqQuote.id, { status: "En validation" }); toast.success(`${reqQuote.id} validé en interne`); }}><CheckCircle2 />Valider</Button>
                  <Button size="sm" disabled={reqQuote.status === "Brouillon"} onClick={() => sendQuote(reqQuote)}><Send />Envoyer au client</Button>
                  {reqQuote.status === "En attente" && <Button size="sm" variant="secondary" onClick={() => { patchQuote(reqQuote.id, { status: "Validé" }); toast.success(`${reqQuote.id} validé par le client`); }}><Sparkles />Simuler validation client</Button>}
                </div>
                {reqQuote.status === "Brouillon" && <p className="text-[11px] text-muted-foreground">L’envoi au client nécessite d’abord une validation interne du devis.</p>}

                {reqQuote.status === "Validé" && !reqOrder && <div className="rounded-md border border-primary bg-success-soft/40 p-4">
                  <p className="text-xs font-extrabold text-primary">Devis validé</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Le client a validé le devis {reqQuote.id}. Vous pouvez créer la commande correspondante.</p>
                  <Button className="mt-3" onClick={() => setOrderForm({ quoteId: reqQuote.id, requestId: reqQuote.requestId, client: reqQuote.client, contact: reqQuote.contact, product: reqQuote.product, qty: reqQuote.qty, unitPrice: reqQuote.unitPrice, amount: reqQuote.total, date: "23/09/2026", delivery: req.desired, payment: reqQuote.payment, source: reqQuote.source })}><PackagePlus />Créer la commande</Button>
                </div>}

                {reqOrder && <div className="rounded-md border border-primary bg-success-soft/40 p-4">
                  <p className="text-xs font-extrabold text-primary">Commande {reqOrder.id} créée</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Créée à partir du devis {reqQuote.id} — {money(reqOrder.amount)}.</p>
                  <Button className="mt-3" size="sm" variant="outline" onClick={() => { setOpenReq(null); setOpenOrder(reqOrder.id); }}><Eye />Voir la commande</Button>
                </div>}
              </div>}
            </div>
          </>}
        </SheetContent>
      </Sheet>

      {/* -------- panneau devis -------- */}
      <Sheet open={!!openQuote} onOpenChange={o => !o && setOpenQuote(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-[50vw]">
          {quote && <>
            <SheetHeader><SheetTitle className="flex flex-wrap items-center gap-2"><span className="font-mono text-primary">{quote.id}</span><StatusBadge tone={quoteTone(quote.status) as any}>{quote.status}</StatusBadge></SheetTitle></SheetHeader>
            <div className="space-y-4 py-4">
              <div className="rounded-md border bg-card p-4">
                <p className="mb-3 text-xs font-extrabold">Informations client</p>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  <Field label="Entreprise">{quote.client}</Field><Field label="Contact">{quote.contact}</Field><Field label="Commercial">{quote.rep}</Field>
                  <Field label="Demande associée">{quote.requestId}</Field><Field label="Source">{quote.source}</Field><Field label="Scénario utilisé">{quote.scenario}</Field>
                </div>
              </div>
              <QuotePreview q={quote} />
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => toast.success(`${quote.id} ouvert en modification`)}><Pencil />Modifier</Button>
                <Button size="sm" variant="outline" disabled={quote.status !== "Brouillon"} onClick={() => { patchQuote(quote.id, { status: "En validation" }); toast.success(`${quote.id} validé en interne`); }}><CheckCircle2 />Valider</Button>
                <Button size="sm" disabled={quote.status === "Brouillon"} onClick={() => sendQuote(quote)}><Send />Envoyer au client</Button>
                {quote.status === "En attente" && <Button size="sm" variant="secondary" onClick={() => { patchQuote(quote.id, { status: "Validé" }); toast.success(`${quote.id} validé par le client`); }}><Sparkles />Simuler validation client</Button>}
                <Button size="sm" variant="outline" onClick={() => { setOpenQuote(null); setOpenReq(quote.requestId); }}><Eye />Voir la demande</Button>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => { patchQuote(quote.id, { status: "Refusé" }); toast.success(`${quote.id} annulé`); }}><Ban />Annuler</Button>
              </div>
            </div>
          </>}
        </SheetContent>
      </Sheet>

      {/* -------- panneau commande -------- */}
      <Sheet open={!!openOrder} onOpenChange={o => !o && setOpenOrder(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-[50vw]">
          {order && <>
            <SheetHeader><SheetTitle className="flex flex-wrap items-center gap-2"><span className="font-mono text-primary">{order.id}</span><StatusBadge tone={orderTone(order.status) as any}>{order.status}</StatusBadge></SheetTitle></SheetHeader>
            <div className="space-y-4 py-4">
              <div className="rounded-md border bg-card p-4">
                <p className="mb-3 text-xs font-extrabold">Informations commande</p>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  <Field label="Client">{order.client}</Field><Field label="Contact">{order.contact}</Field><Field label="Devis associé">{order.quoteId}</Field>
                  <Field label="Produit">{order.product}</Field><Field label="Quantité">{order.qty.toLocaleString("fr-FR")}</Field><Field label="Prix unitaire">{Number(order.unitPrice).toFixed(2)} DH</Field>
                  <Field label="Montant">{money(order.amount)}</Field><Field label="Date">{order.date}</Field><Field label="Livraison prévue">{order.delivery}</Field>
                  <Field label="Conditions de paiement">{order.payment}</Field><Field label="Source">{order.source}</Field>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => toast.success(`${order.id} ouvert en modification`)}><Pencil />Modifier</Button>
                <Button size="sm" variant="outline" onClick={() => { patchOrder(order.id, { status: "Confirmée" }); toast.success(`${order.id} confirmée`); }}><CheckCircle2 />Confirmer</Button>
                <Button size="sm" variant="outline" onClick={() => { patchOrder(order.id, { status: "En production" }); toast.success(`${order.id} passée en production`); }}><Factory />Passer en production</Button>
                <Button size="sm" variant="outline" onClick={() => { patchOrder(order.id, { status: "Expédiée" }); toast.success(`${order.id} marquée comme expédiée`); }}><Truck />Marquer comme expédiée</Button>
                <Button size="sm" variant="outline" onClick={() => { patchOrder(order.id, { status: "Livrée" }); toast.success(`${order.id} marquée comme livrée`); }}><CheckCircle2 />Marquer comme livrée</Button>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => { patchOrder(order.id, { status: "Annulée" }); toast.success(`${order.id} annulée`); }}><Ban />Annuler</Button>
              </div>
            </div>
          </>}
        </SheetContent>
      </Sheet>

      {/* -------- création manuelle de scénario -------- */}
      <ScenarioDialog open={!!scenarioForm} product={req?.product ?? productCatalog[0].name} qty={req?.qty ?? 5000} onClose={() => setScenarioForm(null)}
        onSave={s => { const id = scenarioForm!; setCustom(v => ({ ...v, [id]: [...(v[id] ?? []), s] })); setPicked(v => ({ ...v, [id]: s })); setScenarioForm(null); toast.success("Scénario enregistré et sélectionné"); }} />

      {/* -------- formulaire commande -------- */}
      <Dialog open={!!orderForm} onOpenChange={o => !o && setOrderForm(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader><DialogTitle>Créer la commande — devis {orderForm?.quoteId}</DialogTitle></DialogHeader>
          {orderForm && <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-semibold">Client<Input className="mt-1" value={orderForm.client} onChange={e => setOrderForm({ ...orderForm, client: e.target.value })} /></label>
            <label className="text-xs font-semibold">Contact<Input className="mt-1" value={orderForm.contact} onChange={e => setOrderForm({ ...orderForm, contact: e.target.value })} /></label>
            <label className="text-xs font-semibold">Produit<Input className="mt-1" value={orderForm.product} onChange={e => setOrderForm({ ...orderForm, product: e.target.value })} /></label>
            <label className="text-xs font-semibold">Quantité<Input className="mt-1" type="number" value={orderForm.qty} onChange={e => setOrderForm({ ...orderForm, qty: Number(e.target.value) })} /></label>
            <label className="text-xs font-semibold">Prix unitaire<Input className="mt-1" value={orderForm.unitPrice} onChange={e => setOrderForm({ ...orderForm, unitPrice: Number(e.target.value) })} /></label>
            <label className="text-xs font-semibold">Montant total<Input className="mt-1" value={orderForm.amount} onChange={e => setOrderForm({ ...orderForm, amount: Number(e.target.value) })} /></label>
            <label className="text-xs font-semibold">Date de livraison<Input className="mt-1" value={orderForm.delivery} onChange={e => setOrderForm({ ...orderForm, delivery: e.target.value })} /></label>
            <label className="text-xs font-semibold">Conditions de paiement<Input className="mt-1" value={orderForm.payment} onChange={e => setOrderForm({ ...orderForm, payment: e.target.value })} /></label>
          </div>}
          <DialogFooter><Button variant="outline" onClick={() => setOrderForm(null)}>Annuler</Button><Button onClick={confirmOrder}><PackagePlus />Créer la commande</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}

function ScenarioDialog({ open, product, qty, onClose, onSave }: { open: boolean; product: string; qty: number; onClose: () => void; onSave: (s: Any) => void }) {
  const [f, setF] = useState<Any>({ product, ref: "", qty, unitPrice: 1.9, discount: 0, tva: 20, delay: "7 jours ouvrables", payment: "30% à la commande, solde à 30 jours", validity: "30 jours", conditions: "Prix HT départ usine Casablanca.", notes: "" });
  const set = (k: string, v: any) => setF({ ...f, [k]: v });
  return <Dialog open={open} onOpenChange={o => !o && onClose()}>
    <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
      <DialogHeader><DialogTitle>Créer un scénario de devis</DialogTitle></DialogHeader>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-semibold">Produit<Input className="mt-1" value={f.product} onChange={e => set("product", e.target.value)} /></label>
        <label className="text-xs font-semibold">Référence<Input className="mt-1" value={f.ref} onChange={e => set("ref", e.target.value)} placeholder="PRD-SAC-001" /></label>
        <label className="text-xs font-semibold">Quantité<Input className="mt-1" type="number" value={f.qty} onChange={e => set("qty", Number(e.target.value))} /></label>
        <label className="text-xs font-semibold">Prix unitaire (DH)<Input className="mt-1" type="number" step="0.01" value={f.unitPrice} onChange={e => set("unitPrice", Number(e.target.value))} /></label>
        <label className="text-xs font-semibold">Remise (%)<Input className="mt-1" type="number" value={f.discount} onChange={e => set("discount", Number(e.target.value))} /></label>
        <label className="text-xs font-semibold">TVA (%)<Input className="mt-1" type="number" value={f.tva} onChange={e => set("tva", Number(e.target.value))} /></label>
        <label className="text-xs font-semibold">Délai de livraison<Input className="mt-1" value={f.delay} onChange={e => set("delay", e.target.value)} /></label>
        <label className="text-xs font-semibold">Conditions de paiement<Input className="mt-1" value={f.payment} onChange={e => set("payment", e.target.value)} /></label>
        <label className="text-xs font-semibold">Validité du devis<Input className="mt-1" value={f.validity} onChange={e => set("validity", e.target.value)} /></label>
        <label className="text-xs font-semibold sm:col-span-2">Conditions particulières<Textarea className="mt-1" value={f.conditions} onChange={e => set("conditions", e.target.value)} /></label>
        <label className="text-xs font-semibold sm:col-span-2">Notes<Textarea className="mt-1" value={f.notes} onChange={e => set("notes", e.target.value)} /></label>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Annuler</Button>
        <Button onClick={() => onSave({ ...f, id: `SCN-M${Date.now()}`, label: "Scénario manuel", total: Math.round(f.unitPrice * f.qty * (1 - f.discount / 100)), margin: 22, similarity: 100, reason: f.notes || "Scénario créé manuellement par le commercial.", recommended: false })}>Enregistrer le scénario</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>;
}
