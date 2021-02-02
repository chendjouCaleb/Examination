using System;
using System.Collections.Generic;
using Everest.AspNetStartup.Infrastructure;
using Everest.AspNetStartup.Persistence;
using Exam.Entities;
using Exam.Loaders;
using Exam.Persistence.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
    /// <summary>
    /// Permet de gérer les membres d'une établissements scolaire.
    ///
    /// <see cref="Member"/>
    /// </summary>
    [Route("api/members")]
    public class MemberController
    {
        private IMemberRepository _memberRepository;

        public MemberController(IMemberRepository memberRepository)
        {
            _memberRepository = memberRepository;
        }


        [HttpGet("{memberId}")]
        [LoadMember]
        public Member Get(Member member) => member;

        [HttpGet]
        [LoadSchool(Source = ParameterSource.Query)]
        public List<Member> List(School school)
        {
            return school.Members;
        }


        /// <summary>
        /// Pour ajouter un nouveau membre dans un établissement.
        /// </summary>
        /// <param name="school">L'établissment qui va recevoir le membre.</param>
        /// <param name="userId">Le compte du nouveau membre.</param>
        /// <returns></returns>
        /// 
        public Member _Add(School school, string userId)
        {
            if (school == null)
            {
                throw new ArgumentNullException(nameof(school));
            }

            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentNullException(nameof(userId));
            }

            Member member = _memberRepository.First(m => school.Equals(m.School) && m.UserId == userId);

            if (member != null)
            {
                return member;
            }

            member = new Member
            {
                School = school,
                UserId = userId
            };

            _memberRepository.Save(member);
            return member;
        }


        /// <summary>
        /// Supprimer un membre.
        /// </summary>
        /// <param name="member">Le membre à supprimer.</param>
        public void Delete(Member member)
        {
            if (member == null)
            {
                throw new ArgumentNullException(nameof(member));
            }

            _memberRepository.Delete(member);
        }

        public void DeleteAll(School school)
        {
            _memberRepository.DeleteAll(school);
        }
    }
}