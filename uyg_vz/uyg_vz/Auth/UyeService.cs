
using System.Linq;
using uyg_vz.Models;
using uyg_vz.ViewModel;

namespace uyg_vz.Auth
{
    public class UyeService
    {
        DB01Entities db = new DB01Entities();

        public UyeModel UyeOturumAc(string email, string parola)
        {
            UyeModel uye = db.Uye.Where(s => s.uyeMail == email && s.uyeSifre == parola).Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                uyeAdsoyad = x.uyeAdsoyad,
                uyeMail = x.uyeMail,
                uyeSifre = x.uyeSifre,
                uyeRol = x.uyeRol
            }).SingleOrDefault();
            return uye;

        }
    }
}
