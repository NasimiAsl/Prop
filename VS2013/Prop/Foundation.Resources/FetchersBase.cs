using System;
using System.Collections.Generic;
using System.Data.Objects;
using System.Data.Objects.DataClasses;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.Resources
{
    public class FetchersBase<Container, Entity>
        where Entity : EntityObject
        where Container : ObjectContext
    {
        public const string AllItemsCacheKey = "AllItems";
        public const string ItemCacheKey = "Item"; 
        public static bool UseCache { get; set; }

        protected static Dictionary<string, List<Entity>> CachedItems { get; set; }

        protected static List<Entity> GetCacheItems(String key)
        {
            return CachedItems[key];
        }

        protected static bool IsExistCache(String key)
        {
            return CachedItems != null && CachedItems.ContainsKey(key) && CachedItems[key] != null;
        }


        protected static void RemoveCacheItems(String key)
        {
            CachedItems.Remove(key);
        }

        public static void ClearCacheItems()
        {
            CachedItems = new Dictionary<string, List<Entity>>();
        }

    

        public static Container GetInstance(Container context = null)
        {
            if (context == null)
            {
                var containerType = typeof(Container);
                context = (Container)containerType.Assembly.CreateInstance(containerType.FullName);
            }

            return context;
        }


        public static ObjectSet<Entity> GetObjectSet(Container context = null)
        {
            context = GetInstance(context);

            var containerType = typeof(Container);
            var entityType = typeof(Entity);
            var objectSetPrp = containerType.GetProperties().Where(
                x => x.PropertyType.Name.Contains("ObjectSet") &&
                x.PropertyType.GenericTypeArguments.Length == 1 &&
                x.PropertyType.GenericTypeArguments.First().Name == entityType.Name).FirstOrDefault();

            if (objectSetPrp == null) throw new Exception("Fetcher Can not found any ObjectSet Matched with " + entityType.Name);

            return (ObjectSet<Entity>)objectSetPrp.GetValue(context, null);
        }

        public static List<Entity> GetAllItems(Container context = null)
        {
            if (UseCache && IsExistCache(AllItemsCacheKey))
                return GetCacheItems(AllItemsCacheKey);

            var objectSet = GetObjectSet(context);
            var list = (from x in objectSet select x).ToList();

            if (UseCache && list != null && list.Count > 0)
                CachedItems.Add(AllItemsCacheKey, list);

            return list;

        }

        public static RepositoryBase<Container> Repository(Container context = null)
        {
            context = GetInstance(context);
            return new RepositoryBase<Container>(context);
        } 
    }
}
