using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uyg_vz.ViewModel
{
    public class CevapModel
    {
        public string cevapId { get; set; }
        public string cevapSecenekId { get; set; }
        public string cevapSecenek { get; set; }
        public string cevapUyeId { get; set; }
        public System.DateTime cevaplamaZamani { get; set; }
        public CevapModel cevapBilgi { get; set; }
        public UyeModel uyeBilgi { get; set; }
    }
}