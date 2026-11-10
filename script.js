(() => {
  const year = document.querySelector('#copyright-year');
  if (year) year.textContent = new Date().getFullYear();
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-panel');
  if (toggle && menu) {
    const close = () => { menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); toggle.textContent='☰'; toggle.setAttribute('aria-label','Open navigation'); };
    toggle.addEventListener('click', () => { const open = menu.classList.toggle('open'); toggle.setAttribute('aria-expanded',String(open)); toggle.textContent=open?'×':'☰'; toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation'); });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click',close));
    document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
    window.addEventListener('resize', () => { if(window.innerWidth > 900) close(); });
  }
  const shown = new IntersectionObserver((entries, observer) => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }}), {threshold:.08});
  document.querySelectorAll('.reveal').forEach(el => shown.observe(el));
  document.querySelectorAll('.faq button').forEach(btn => btn.addEventListener('click', () => { let block=btn.closest('.faq'); let expanded=btn.getAttribute('aria-expanded')==='true'; btn.setAttribute('aria-expanded',String(!expanded)); block.classList.toggle('open',!expanded); }));
  const form = document.querySelector('#lead-form');
  const status = document.querySelector('#form-status');
  if (form && status) form.addEventListener('submit', e => {
    e.preventDefault(); if(!form.reportValidity())return;
    const fd=new FormData(form); const to=form.dataset.email;
    const body=['Name: '+fd.get('name'),'Company: '+(fd.get('company')||'-'),'Email: '+fd.get('email'),'Phone: '+fd.get('phone'),'State: '+(fd.get('state')||'-'),'Service: '+(fd.get('interest')||'-'),'Agents needed: '+(fd.get('seats')||'-'),'','Message:',fd.get('message')||'-'].join('\n');
    const href='mailto:'+to+'?subject='+encodeURIComponent('Website inquiry: '+fd.get('name'))+'&body='+encodeURIComponent(body);
    const a=document.createElement('a'); a.href=href; a.target='_top'; document.body.appendChild(a); a.click(); a.remove();
    status.innerHTML='Your email app should open with your details filled in. If it did not, email us directly at <a href="'+href+'">'+to+'</a>.';
    status.classList.add('visible');
  });
})();
