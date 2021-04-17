using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Tracking
{
    public class List
    {
        public class Query : IRequest<Result<List<Application.ProfileBL.Profile>>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Application.ProfileBL.Profile>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;

            }
            public async Task<Result<List<Application.ProfileBL.Profile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profiles = new List<ProfileBL.Profile>();

                switch (request.Predicate)
                {
                    case "trackers":
                        profiles = await _context.UserTrackings.Where(x => x.Target.UserName == request.Username)
                                        .Select(u => u.Observer).ProjectTo<ProfileBL.Profile>(_mapper.ConfigurationProvider, new { currentUserName = _userAccessor.GetUsername() })
                                        .ToListAsync();
                        break;
                    case "trackings":
                        profiles = await _context.UserTrackings.Where(x => x.Observer.UserName == request.Username)
                                        .Select(u => u.Target).ProjectTo<ProfileBL.Profile>(_mapper.ConfigurationProvider, new { currentUserName = _userAccessor.GetUsername() })
                                        .ToListAsync();
                        break;
                }

                return Result<List<Application.ProfileBL.Profile>>.Success(profiles);
            }
        }
    }
}