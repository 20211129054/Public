using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using uyg_vz.Models;
using uyg_vz.ViewModel;

namespace uyg_vz.Controllers
{
    //[Authorize]
    public class ServisController : ApiController
    {
        DB01Entities db = new DB01Entities();
        SonucModel sonuc = new SonucModel();

        #region Uye

        [HttpGet]

        [Route("api/uyeliste")]
        public List<UyeModel> UyeListe()
        {
            List<UyeModel> liste = db.Uye.Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                uyeAdsoyad = x.uyeAdsoyad,
                uyeDogTarih = x.uyeDogTarih,
                uyeMail = x.uyeMail,
                uyeSifre = x.uyeSifre,
                uyeRol = x.uyeRol,
                uyeAnketSayisi = x.Anket.Count()
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/uyebyid/{uyeId}")]
        public UyeModel UyeById(string uyeId)
        {
            UyeModel kayit = db.Uye.Where(s => s.uyeId == uyeId).Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                uyeAdsoyad = x.uyeAdsoyad,
                uyeDogTarih = x.uyeDogTarih,
                uyeMail = x.uyeMail,
                uyeSifre = x.uyeSifre,
                uyeRol = x.uyeRol,
                uyeAnketSayisi = x.Anket.Count()
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyeModel model)
        {
            if (db.Uye.Count(c => c.uyeMail == model.uyeMail) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen üye maili kayıtlıdır!";
                return sonuc;
            }

            Uye yeni = new Uye();
            yeni.uyeId = Guid.NewGuid().ToString();
            yeni.uyeAdsoyad = model.uyeAdsoyad;
            yeni.uyeDogTarih = model.uyeDogTarih;
            yeni.uyeMail = model.uyeMail;
            yeni.uyeSifre = model.uyeSifre;
            yeni.uyeRol = model.uyeRol;
            db.Uye.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Eklendi";
            return sonuc;
        }
        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyeModel model)
        {
            Uye kayit = db.Uye.Where(s => s.uyeId == model.uyeId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunmadı!";
                return sonuc;
            }

            kayit.uyeAdsoyad = model.uyeAdsoyad;
            kayit.uyeDogTarih = model.uyeDogTarih;
            kayit.uyeMail = model.uyeMail;
            kayit.uyeSifre = model.uyeSifre;
            kayit.uyeRol = model.uyeRol;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]
        public SonucModel UyeSil(string uyeId)
        {
            Uye kayit = db.Uye.Where(s => s.uyeId == uyeId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunmadı!";
                return sonuc;
            }

            if (db.Anket.Count(c => c.anketUyeId == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde anket bulunan üye silinemez!";
                return sonuc;
            }


            db.Uye.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi";
            return sonuc;
        }

        #endregion

        #region Anket
        [HttpGet]
        [Route("api/anketliste")]
        public List<AnketModel> AnketListe()
        {
            List<AnketModel> liste = db.Anket.Select(x => new AnketModel()
            {
                anketId = x.anketId,
                anketAdi = x.anketAdi,
                anketAciklama = x.anketAciklama,
                anketUyeId = x.anketUyeId,
                anketSoruSayisi = x.Soru.Count()
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/anketbyid/{anketId}")]
        public AnketModel AnketById(string anketId)
        {
            AnketModel kayit = db.Anket.Where(s => s.anketId == anketId).Select(x => new AnketModel()
            {
                anketId = x.anketId,
                anketAdi = x.anketAdi,
                anketAciklama = x.anketAciklama,
                anketUyeId = x.anketUyeId,
                anketSoruSayisi = x.Soru.Count()
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/anketekle")]
        public SonucModel AnketEkle(AnketModel model)
        {
            Anket yeni = new Anket();
            yeni.anketId = Guid.NewGuid().ToString();
            yeni.anketAdi = model.anketAdi;
            yeni.anketAciklama = model.anketAciklama;
            yeni.anketUyeId = model.anketUyeId;
            db.Anket.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Anket Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/anketduzenle")]
        public SonucModel AnketDuzenle(AnketModel model)
        {
            Anket kayit = db.Anket.Where(s => s.anketId == model.anketId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.anketId = model.anketId;
            kayit.anketAdi = model.anketAdi;
            kayit.anketAciklama = model.anketAciklama;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Anket Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/anketsil/{anketId}")]
        public SonucModel AnketSil(string anketId)
        {
            Anket kayit = db.Anket.Where(s => s.anketId == anketId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Soru.Count(c => c.soruAnketId == anketId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Soru Kayıtlı Anket Silinemez!";
                return sonuc;
            }

            db.Anket.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Anket Silindi";

            return sonuc;
        }
        #endregion

        #region Anket Listele By ÜyeId

        [HttpGet]
        [Route("api/anketlistelebyuyeid/{uyeId}")]
        public List<AnketModel> AnketListeleByUyeId(string uyeId)
        {
            List<AnketModel> liste = db.Anket.Where(s => s.anketUyeId == uyeId).Select(x => new AnketModel()
            {
                anketId = x.anketId,
                anketUyeId = x.anketUyeId,
                anketAciklama = x.anketAciklama,
                anketAdi = x.anketAdi,
                anketSoruSayisi = x.Soru.Count(),
            }).ToList();

            foreach (var anket in liste)
            {
                anket.uyeBilgi = UyeById(anket.anketUyeId);
                anket.anketBilgi = AnketById(anket.anketUyeId);
            }
            return liste;
        }


        #endregion

        #region Soru
        [HttpGet]
        [Route("api/soruliste")]
        public List<SoruModel> SoruListe()
        {
            List<SoruModel> liste = db.Soru.Select(x => new SoruModel()
            {
                soruId = x.soruId,
                soru = x.soru,
                soruAnketId = x.soruAnketId,
                soruSecenekSayisi = x.Secenek.Count()
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/sorubyid/{soruId}")]
        public SoruModel SoruById(string soruId)
        {
            SoruModel kayit = db.Soru.Where(s => s.soruId == soruId).Select(x => new SoruModel()
            {
                soruId = x.soruId,
                soru = x.soru,
                soruAnketId = x.soruAnketId,
                soruSecenekSayisi = x.Secenek.Count()
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/soruekle")]
        public SonucModel SoruEkle(SoruModel model)
        {
            if (db.Soru.Count(c => c.soru == model.soru) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen soru kayıtlıdır!";
                return sonuc;
            }

            Soru yeni = new Soru();
            yeni.soruId = Guid.NewGuid().ToString();
            yeni.soru = model.soru;
            yeni.soruAnketId = model.soruAnketId;
            db.Soru.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Soru Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/soruduzenle")]
        public SonucModel SoruDuzenle(SoruModel model)
        {
            Soru kayit = db.Soru.Where(s => s.soruId == model.soruId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.soruId = model.soruId;
            kayit.soru = model.soru;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Soru Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/sorusil/{soruId}")]
        public SonucModel SoruSil(string soruId)
        {
            Soru kayit = db.Soru.Where(s => s.soruId == soruId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Soru.Count(c => c.soruAnketId == soruId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Soru Kayıtlı Soru Silinemez!";
                return sonuc;
            }

            db.Soru.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Soru Silindi";

            return sonuc;
        }
        #endregion

        #region Soru Listele By AnketId

        [HttpGet]
        [Route("api/sorulistelebyanketid/{anketId}")]
        public List<SoruModel> SoruListeleByAnketId(string anketId)
        {
            List<SoruModel> liste = db.Soru.Where(s => s.soruAnketId == anketId).OrderBy(o => o.soru).Select(x => new SoruModel()
            {
                soruId = x.soruId,
                soruAnketId = x.soruAnketId,
                soru = x.soru,
                soruSecenekSayisi = x.Secenek.Count(),
            }).ToList();

            foreach (var soru in liste)
            {
                soru.soruBilgi = SoruById(soru.soruAnketId);
                soru.anketBilgi = AnketById(soru.soruAnketId);
                soru.secenekler = SecenekListeleBySoruId(soru.soruId);
            }
            return liste;

        }

        #endregion


        #region Seçenek
        [HttpGet]
        [Route("api/secenekliste")]
        public List<SecenekModel> SecenekListe()
        {
            List<SecenekModel> liste = db.Secenek.Select(x => new SecenekModel()
            {
                secenekId = x.secenekId,
                secenekSoruId = x.secenekSoruId,
                secenek = x.secenek,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/secenekbyid/{secenekId}")]
        public SecenekModel SecenekById(string secenekId)
        {
            SecenekModel kayit = db.Secenek.Where(s => s.secenekId == secenekId).Select(x => new SecenekModel()
            {
                secenekId = x.secenekId,
                secenekSoruId = x.secenekSoruId,
                secenek = x.secenek,
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/secenekekle")]
        public SonucModel SecenekEkle(SecenekModel model)
        {
            if (db.Secenek.Count(c => c.secenek == model.secenek) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen secenek kayıtlıdır!";
                return sonuc;
            }

            Secenek yeni = new Secenek();
            yeni.secenekId = Guid.NewGuid().ToString();
            yeni.secenekSoruId = model.secenekSoruId;
            yeni.secenek = model.secenek;
            db.Secenek.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Secenek Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/secenekduzenle")]
        public SonucModel SecenekDuzenle(SecenekModel model)
        {
            Secenek kayit = db.Secenek.Where(s => s.secenekId == model.secenekId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.secenekId = model.secenekId;
            kayit.secenek = model.secenek;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Secenek Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/seceneksil/{secenekId}")]
        public SonucModel SecenekSil(string secenekId)
        {
            Secenek kayit = db.Secenek.Where(s => s.secenekId == secenekId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            db.Secenek.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Secenek Silindi";

            return sonuc;
        }
        #endregion

        #region Seçenek Listele By SoruId

        [HttpGet]
        [Route("api/seceneklistelebysoruid/{soruId}")]
        public List<SecenekModel> SecenekListeleBySoruId(string soruId)
        {
            List<SecenekModel> liste = db.Secenek.Where(s => s.secenekSoruId == soruId).OrderBy(o => o.secenek).Select(x => new SecenekModel()
            {
                secenekId = x.secenekId,
                secenekSoruId = x.secenekSoruId,
                secenek = x.secenek,
                cevapSayisi = x.Cevap.Count()
            }).ToList();

            foreach (var secenek in liste)
            {
                secenek.secenekBilgi = SecenekById(secenek.secenekSoruId);
                secenek.soruBilgi = SoruById(secenek.secenekSoruId);
            }
            return liste;

        }


        #endregion

        #region Cevap
        [HttpPost]
        [Route("api/cevapekle")]
        public SonucModel CevapEkle(CevapModel model)
        {

            Cevap yeni = new Cevap();
            yeni.cevapId = Guid.NewGuid().ToString();
            yeni.cevapSecenekId = model.cevapSecenekId;
            yeni.cevapSecenek = model.cevapSecenek;
            yeni.cevaplamaZamani = DateTime.Now;
            yeni.cevapUyeId = model.cevapUyeId;
            db.Cevap.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Cevap Eklendi";

            return sonuc;
        }

        [HttpGet]
        [Route("api/cevapgoruntule/{secenekId}")]
        public List<CevapModel> CevapGoruntule(string secenekId)
        {
            var cevaplar = db.Cevap.Where(x => x.cevapSecenekId == secenekId).Select(x => new CevapModel()
            {
                cevapId = x.cevapId,
                cevaplamaZamani = x.cevaplamaZamani,
                cevapSecenek = x.cevapSecenek,
                cevapSecenekId = x.cevapSecenekId,
                cevapUyeId = x.cevapUyeId
            }).ToList();

            return cevaplar;
        }

        #endregion

    }
}
