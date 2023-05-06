using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uyg_vz.ViewModel
{
    public class AnketModel
    {
        public string anketId { get; set; }
        public string anketAdi { get; set; }
        public string anketAciklama { get; set; }
        public string anketUyeId { get; set; }
        public int anketSoruSayisi { get; set; }
        public UyeModel uyeBilgi { get; set; }
        public AnketModel anketBilgi { get; set; }
    }
}