using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NiazeRooz2014.UI.Controllers
{
    public class UrlManager
    {

        public UrlManager()
        {

        }

        /*
         * 
         *   Section Struct =[WordsState:1bit][Type:4bit][RepeatededTimes : 4bit| Words Count : 4bit | Special Id : unlimited]
         *  
         * .com/[ Represented Url Sections  ]?[ Url Sections Types Hashed Structure ] 
         * 
            for one Section  keywords             categories           locations           tag            * (composite)    FullSection         
            --------------------------------------------------------------------------------------------------            
         *  Single Word      [key][n]           [cat][n]              [loc][n]            [tag][n]        Nan              [section][id]
         *   Multi Word      [key][n]           [m][cat][ws]          [m][loc][ws]        [m][tag][ws]    Nan              [section][id]
           
         * oprators     
          ----------------------------------------------------------------------------------------------------
         *   and             default           [cat][and][cat]       [loc][and][loc]      default         Default              nan
         *   or              [or][key][n]      default               default              [or][tag][n]    [ ... ][or][ ... ]   nan        
         *  
         *   not             [not][key][1]      [not][cat][1]        [not][loc][1]        [not][tag][1]
         *                   [not][m][key][ws]  [not][m][cat][ws]    [not][m][loc][ws]    [not][m][tag][ws]
         *                   
         *                   
         *  [n]  : similer section types as Repeated Times   
         *  [m]  : MultiWords_sctionPart
         *  [ws] : Section Words count
         *  
         */
        /// <summary>
        /// Url Secions Types
        /// Dont Define Enumeration Index Larger than MaxUrlSectionTypesCount
        /// </summary>
        public enum UrlSectionTypes
        {

            SectionSpliterOpration = 0,
            /*
             
             *  for Define FullSection UrlSectionType  
             *  .com/[FullSection UrlSectionType]?[UrlSectionType Enumeration Hashed Structure]
             
             */
            FullSection = 1, /* Defined For a Category or Tag or Type or Location  */

            /*
             
              *  for Define  Section Part UrlSectionType  
              *  .com/[part1+part2+part3+...]?[UrlSectionType Enumerations Hashed Structure]
             
              */
            Detail = 5,
            CategoryType = 6,
            Category = 7, /* Defined For Any Category  Section Part
                           * [Category][Repeat Count]  = [Category][Category][Category]...  */
            Location = 8, /* Defined For Any Country Province and City Section Part  
                           * [Location][Repeat Count]  = [Location][Location][Location]...   */
            Tag = 9,      /* Defined For Any registred keyword (tag) Section Part 
                           * [Tag][Repeat Count]  = [Tag][Tag][Tag]...   */
            Keyword = 10, /* Defined For Any searched keyword not in tags collection Section Part  
                           * [Keyword][Repeat Count]  = [Keyword][Keyword][Keyword]...   
                           * any Word Instead with a Section*/
            Page = 11,   /*
                          * [FirstSection Part - complete 3th Part][Page][PageNumber]
                          * [1][2 = Page][3] 
                          * */
            Sort = 12,   /*
                          * [SortMode: Asc | deas][Sort Section Type ][Sort Field Index] Sort Field Index 0 - 15 
                          * */


            /*
             When we have a Section Part With MultiWords We Use This Part Befor Part
             * Struct for Tag = [MultiWords_sctionPart][Tag][Words Count]
             * Struct for Cat = [MultiWords_sctionPart][Category][Words Count]
             * Struct for Loc = [MultiWords_sctionPart][Location][Words Count]
             * Struct for Keword Not Used  because any Word Instead with a Section 
             *  
             *  [کفش] = [tag]
             *  [کفش][چرمی][سفید] = [tag][3]
             *  [کفش چرمی][سفید] = [MultiWords_sctionPart][Tag][2][Tag]  
             */

            Parameter = 15
        }

        public enum UrlSectionTypes_Abbreviation
        {
            opr = 0,
            fct = 1,
            fdt = 2,
            typ = 6,
            cat = 7,
            loc = 8,
            tag = 9,
            key = 10,
            pag = 11,
            srt = 12
        }

        public enum WordsStates
        {
            Single = 0,
            Multi = 1
        }

        /// <summary>
        /// Url Secions Operators 
        /// Dont Define Enumeration Index Larger than MaxUrlSectionOperatorsCount
        /// </summary>
        /// 

        public enum UrlSectionOperators
        {
            None = 0,
            /*
             
             * operators for Sections
             * [...][Part3][Or][Not][Part4][...]
             
             */
            Not = 2,  /*  [Not][Part] =>  [Source Field] Not Like [Part] or [fts] [Not Part] */


            And = 3, /*  [Part1][Part2] => [Part1][And][Part2]  by default two part together have And Oprator
             *     in Category And Location Default oprator Has Or  so
             *   [Category][2] =>  [Cat1][Cat2] => [Cat1][Or][Cat2]  => sql [Source Cat] in (cat1,cat2)
             *   [Location][2] =>  [Loc1][loc2] => [loc1][Or][loc2]  => sql [Source loc] in (loc1,loc2)
             *     ** [Cat1][loc1] => [Cat1] [and] [loc1]
                        *     */
            Or = 4,
        }

        public enum UrlSectionOperators_Abbreviation
        {
            none = 0,
            not = 2,
            or = 3,
            and = 4
        }

        /// <summary>
        /// UrlSectionTypes Items Count  = 15  in Binary = 1111  
        /// </summary>
        public static byte MaxUrlSectionTypesCount = 16;

        public static byte MaxUrlSectionTypesRepeatCount = 16;

        public static byte MaxUrlSectionMultiWordsCount = 16;
        /// <summary>
        /// UrlSectionOprators Items Count  = 7  in Binary = 111  
        /// </summary>
        public static byte MaxUrlSectionOperatorsCount = 8; /// UrlSectionOprators Items Count  = 7  in Binary = 111  
        /// </summary>
        public static byte MaxWordsModeCount = 2;

        /// <summary>
        /// Add 3 Part Of Opration Section 
        /// </summary>
        /// <param name="l"></param>
        /// <param name="sectionValue">Url Section Operators Abbreviation </param>
        /// <returns></returns>
        public static List<System.ConverterExtensions.HelperBase> AddOprations(List<System.ConverterExtensions.HelperBase> l,
            UrlManager.UrlSectionOperators_Abbreviation oprationType)
        {

            if (l == null) l = new List<ConverterExtensions.HelperBase>();

            l.Add(new System.ConverterExtensions.HelperBase()
            {
                _base = UrlManager.MaxWordsModeCount,
                Value = (long)UrlManager.WordsStates.Single
            });

            l.Add(new System.ConverterExtensions.HelperBase()
            {
                _base = UrlManager.MaxUrlSectionTypesCount,
                Value = (long)(UrlManager.UrlSectionTypes.SectionSpliterOpration)
            });

            l.Add(new System.ConverterExtensions.HelperBase()
            {
                _base = UrlManager.MaxUrlSectionTypesCount,
                Value = (long)(oprationType)
            });

            return l;

        }

        public static List<System.ConverterExtensions.HelperBase> AddSectionType(List<System.ConverterExtensions.HelperBase> l,
            UrlSectionTypes_Abbreviation type,
            int SimilarSectionTypeCounter)
        {

            if (l == null) l = new List<ConverterExtensions.HelperBase>();

            l.Add(new System.ConverterExtensions.HelperBase()
                            {
                                _base = UrlManager.MaxWordsModeCount,
                                Value = (long)UrlManager.WordsStates.Single
                            });

            l.Add(new System.ConverterExtensions.HelperBase()
            {
                _base = UrlManager.MaxUrlSectionTypesCount,
                Value = (long)type
            });

            l.Add(new System.ConverterExtensions.HelperBase()
            {
                _base = UrlManager.MaxUrlSectionTypesRepeatCount,
                Value = (long)SimilarSectionTypeCounter
            });

            return l;

        }

        public static List<System.ConverterExtensions.HelperBase> AddMultiWordSction_FirstPart(List<System.ConverterExtensions.HelperBase> l)
        {
            if (l == null) l = new List<ConverterExtensions.HelperBase>();

            l.Add(new System.ConverterExtensions.HelperBase()
            {
                _base = UrlManager.MaxWordsModeCount,
                Value = (long)UrlManager.WordsStates.Single
            });

            return l;
        }

        public static List<System.ConverterExtensions.HelperBase> AddMultiWordSction_SecondPart(List<System.ConverterExtensions.HelperBase> l,
           UrlSectionTypes_Abbreviation type)
        {

            if (l == null) l = new List<ConverterExtensions.HelperBase>();

            l.Add(new System.ConverterExtensions.HelperBase()
            {
                _base = UrlManager.MaxUrlSectionTypesCount,
                Value = (long)type
            });


            return l;

        }

        public static List<System.ConverterExtensions.HelperBase> AddMultiWordSction_ThirdPart(List<System.ConverterExtensions.HelperBase> l,
          long wordCount)
        {

            if (l == null) l = new List<ConverterExtensions.HelperBase>();

            l.Add(new System.ConverterExtensions.HelperBase()
            {
                _base = UrlManager.MaxUrlSectionMultiWordsCount,
                Value = wordCount
            });


            return l;

        }

        public static string Encode(string _struct)
        {
            var key = "EncodeUrl";
            Profiler.Begin(key);
            var list = _struct
                .Replace("'", "")
                .Replace("[", "")
                .Replace("]", "")
                .Replace(" ", "")
                .Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries).ToList();

            Profiler.SetPoint(key, " Splited ");

            var level1 = ConvertToSectionHelper(list);

            Profiler.SetPoint(key, " Process Sections ");

            var li = level1.ToBaseLong();

            Profiler.SetPoint(key, " To Long ");
            var hash = "";

            foreach (var b in li)
            {
                hash += System.ConverterExtensions.ConvertLongToStringBase_special(b, 34) + " ";
            }

            Profiler.End(key);

            return hash;

        }

        public static List<UrlSection> Decode(string hashStruct)
        {

            var key = "DecodeUrl";
            Profiler.Begin(key);

            var list = new List<UrlSection>();
            var hashedList = new List<String>();
            var listLong = new List<long>();

            hashedList.Add("");
            var partCounter = 0;
            var partsIndex = 0;
            for (int i = 0; i < hashStruct.Length; i++)
            {
                if (ConverterExtensions.GetBase34ForChar(hashStruct[i]) != ConverterExtensions.MaxBaseValue)
                {
                    partCounter++;

                    if (partCounter > 11) /* 11 Chars Make Long Value in Base 64 with 6 section 9 bits*/
                    {
                        partCounter = 0;
                        listLong.Add(System.ConverterExtensions.GetBase34ForHash(hashedList[partsIndex]));
                        partsIndex++;
                        hashedList.Add(hashStruct[i].ToString());
                    }
                    else
                    {
                        hashedList[partsIndex] += hashStruct[i];
                    }
                }
            }

            listLong.Add(System.ConverterExtensions.GetBase34ForHash(hashedList[partsIndex]));
            Profiler.SetPoint(key, " Generate Long List ");
            var LongCounter = 0;
            var scCounter = 0;
            foreach (var longItem in listLong)
            {
                var re = longItem;
                scCounter = 0;
                while (re > 0)
                {
                    var part1 = (int)(re - (long)(re / 16) * 16);
                    re = (long)(re / 16);
                    var part2 = (int)(re - (long)(re / 16) * 16);
                    re = (long)(re / 16);
                    var part3 = (int)(re - (long)(re / 2) * 2);
                    re = (long)(re / 2);

                    list.Insert(LongCounter, new UrlSection()
                    {
                        Type = (UrlSectionTypes)part2,
                        Helper = part3 == 1 ? true : false,
                        SectionValue = (int)part1
                    });
                    scCounter++;
                }

                LongCounter += scCounter;

            }
            Profiler.End(key);

            return list;
        }

        public static List<UrlSection> FetchTerms(string url)
        { 
            throw new NotImplementedException();
        }

        public static List<UrlSection> FetchTerms(string termsParameters, List<UrlSection> sections)
        {
            var list = termsParameters.Split(new char[] { ' ', '+' }, StringSplitOptions.RemoveEmptyEntries).ToList();
            var index = 0;

            if (sections.Any(x => x.Type == UrlSectionTypes.FullSection) &&
                sections.Any(XmlSiteMapProvider => XmlSiteMapProvider.Type == UrlSectionTypes.Page))
            {
                var sc = sections.FirstOrDefault(x => x.Type == UrlSectionTypes.Page);
                sc.Terms = new List<string>();
                sc.Terms.Add(list.Last());
                list.Remove(list.Last());
            }

            foreach (var section in sections)
            {
                index = FetchTerm(list, index, section);
            }

            return sections;
        }

        private static int FetchTerm(List<string> list, int index, UrlSection section)
        {
            try
            {
                if (section.Type == UrlSectionTypes.SectionSpliterOpration || section.Type == UrlSectionTypes.Sort)
                {
                }
                else if (section.Type == UrlSectionTypes.Page)
                {
                    section.Terms.Add(list[index++]);
                }
                else if (section.Type == UrlSectionTypes.FullSection)
                {
                    index = MargeSectionValues(list, index, section);
                }
                else
                {
                    if (section.Helper)
                    {
                        index = MargeSectionValues(list, index, section);
                    }
                    else
                    {
                        section.Terms = new List<string>();
                        for (int i = 0; i <= section.SectionValue; i++)
                        {
                            section.Terms.Add(list[index++]);
                        }
                    }
                }
                return index;
            }
            catch (Exception ex)
            {
                Profiler.LogEvent(ex.Message, " ایراد در بازخوانی سکشن ها[" + index + ":" + section.Type.ToString() + "]", "error");
            }

            return index;
        }

        private static int MargeSectionValues(List<string> list, int index, UrlSection section)
        {
            section.Terms = new List<string>();
            var str = "";
            for (int i = 0; i < section.SectionValue; i++)
            {
                str += " " + list[index++];
            }

            section.Terms.Add(str);
            return index;
        }

        private static List<ConverterExtensions.HelperBase> ConvertToSectionHelper(List<string> list, List<ConverterExtensions.HelperBase> helperList = null)
        {
            var key = "EncodeUrl";

            if (helperList == null)
                helperList = new List<ConverterExtensions.HelperBase>();


            var oprs = Enum.GetNames(typeof(UrlManager.UrlSectionOperators)).ToList().Select(x => x.ToLower()).ToList();
            var typs = Enum.GetNames(typeof(UrlManager.UrlSectionTypes_Abbreviation)).ToList().Select(x => x.ToLower()).ToList();
            Profiler.SetPoint(key, " Init Data ");

            long lastSectionType = -1;
            var SimilarSectionTypeCounter = 0;

            var isMultiWord = false;
            var MultiWordState = 0;

            foreach (var item in list)
            {
                if (!isMultiWord)
                {
                    if (item == "ws")
                    {
                        isMultiWord = true;  /* Multi Word Section Start */
                        MultiWordState = 1;  /* Part 1 Of [*ws][type][count]*/
                        helperList = UrlManager.AddMultiWordSction_FirstPart(helperList);
                        helperList.Last().Value = 1;
                    }
                    else if (oprs.Contains(item))
                    {
                        var oprType = (UrlManager.UrlSectionOperators_Abbreviation)Enum.Parse(typeof(UrlManager.UrlSectionOperators_Abbreviation), item);
                        helperList = UrlManager.AddOprations(helperList, oprType);

                    }
                    else if (typs.Contains(item))
                    {
                        var type = ((UrlManager.UrlSectionTypes_Abbreviation)Enum.Parse(typeof(UrlManager.UrlSectionTypes_Abbreviation), item));
                        if (lastSectionType > -1
                            && lastSectionType == (long)type
                            && SimilarSectionTypeCounter < UrlManager.MaxUrlSectionTypesRepeatCount - 1)
                        {
                            SimilarSectionTypeCounter++;
                            helperList.Last().Value = SimilarSectionTypeCounter;
                        }
                        else
                        {
                            lastSectionType = (long)type;
                            SimilarSectionTypeCounter = 0;

                            helperList = UrlManager.AddSectionType(helperList, type, SimilarSectionTypeCounter);

                        }
                    }
                }
                else
                { // Spetial section With Muli Words

                    if (MultiWordState == 1)
                    {
                        MultiWordState = 2; /* part 2 of [ws][*type][count] */
                        var type = ((UrlManager.UrlSectionTypes_Abbreviation)Enum.Parse(typeof(UrlManager.UrlSectionTypes_Abbreviation), item));

                        helperList = UrlManager.AddMultiWordSction_SecondPart(helperList, type);
                    }
                    else if (MultiWordState == 2)
                    {
                        /* part 3 of [ws][type][*count] is number */

                        helperList = UrlManager.AddMultiWordSction_ThirdPart(helperList, long.Parse(item));

                        /* end Section */
                        /* reset States*/
                        isMultiWord = false;
                        MultiWordState = 0;
                        lastSectionType = -1;
                        SimilarSectionTypeCounter = 0;
                    }
                }
            }

            return helperList;
        }

        public class UrlSection
        {
            public UrlManager.UrlSectionOperators Opartor
            {
                get
                {
                    if (Type == UrlSectionTypes.SectionSpliterOpration)
                        return (UrlSectionOperators)SectionValue;

                    return UrlSectionOperators.None;
                }
            }
            public UrlManager.UrlSectionTypes Type { get; set; }

            public bool Helper { get; set; }

            public int SectionValue { get; set; }

            public List<string> Terms { get; set; }

            public override string ToString()
            {
                return (Helper ? "M" : "S") + ":" + Type.ToString() + ":" + SectionValue + " " + (Terms != null ? " Values : " + Terms.ListToString(",") : "");
            }
        }
    }
}