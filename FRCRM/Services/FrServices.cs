using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static FRCRM.Models.FrModel;

namespace FRCRM.Services
{
    public class FrServices
    {
        private const string CacheKey = "ContactStore";
        public FrResponsive[] GetAllShop()
        {
            return new FrResponsive[]
            {
             new FrResponsive
             {
                  Id = 1,
                  Name = "Glenn Block"
             },
             new FrResponsive
             {
                  Id = 2,
                  Name = "Dan Roth"
             }
            };
        }
    }
}