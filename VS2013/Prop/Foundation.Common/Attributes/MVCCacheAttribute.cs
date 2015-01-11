//
//         Copyright (c) NiazeRooz.  All rights reserved. 
//
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace System
{
    /// <summary>
    /// 
    ///     Custom Mvc Action or Controller cache (response cache)
    ///     Defaults : Ex:Now(-1 day) ,  InvalidationHeaders = false,  Revalidation = AllCaches,Cacheability = NoCache
    ///     
    /// </summary>
    public class MVCCacheAttribute : ActionFilterAttribute
    {
        /// <summary>
        ///  Set Default Value
        /// </summary>
        public MVCCacheAttribute()
        {
            Expires = DateTime.UtcNow.AddDays(-1);
            InvalidationHeaders = false;
            Revalidation = HttpCacheRevalidation.AllCaches;
            Cacheability = HttpCacheability.NoCache;
        }

        /// <summary>
        /// 
        ///     Sets the Expires HTTP header to an absolute date and time.
        /// 
        /// </summary>
        public DateTime Expires { get; set; }

        /// <summary>
        /// 
        ///     Specifies whether the ASP.NET cache should ignore HTTP Cache-Control headers sent by the client that invalidate the cache.
        /// 
        /// </summary>
        public bool InvalidationHeaders { get; set; }

        /// <summary>
        /// 
        ///     Sets the Cache-Control HTTP header to either the must-revalidate or the proxy-revalidate directives based on the supplied enumeration value.
        /// 
        /// </summary>
        public HttpCacheRevalidation Revalidation { get; set; }

        /// <summary>
        /// 
        ///     Sets the Cache-Control HTTP header. The Cache-Control HTTP header controls how documents are to be cached on the network.
        /// 
        /// </summary>
        public HttpCacheability Cacheability { get; set; }

        /// <summary>
        /// 
        ///    override Methode
        ///    Controller Event Called When the Action is Prepare Response
        /// 
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            filterContext.HttpContext.Response.Cache.SetExpires(Expires);
            filterContext.HttpContext.Response.Cache.SetValidUntilExpires(InvalidationHeaders);
            filterContext.HttpContext.Response.Cache.SetRevalidation(Revalidation);
            filterContext.HttpContext.Response.Cache.SetCacheability(Cacheability);
            filterContext.HttpContext.Response.Cache.SetNoStore();

            base.OnResultExecuting(filterContext);
        }
    }
}
