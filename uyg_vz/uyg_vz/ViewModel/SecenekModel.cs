using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uyg_vz.ViewModel
{
    public class SecenekModel
    {
        public string secenekId { get; set; }
        public string secenekSoruId { get; set; }
        public string secenek { get; set; }
        public int secenekSayisi { get; set; }
        public SecenekModel secenekBilgi { get; set; }
        public SoruModel soruBilgi { get; set; }
        public int cevapSayisi { get; set; }
    }
}